/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include "eosio.token.hpp"

namespace eosio {
	
void token::check(account_name euser, account_name iuser, string memo){
	require_auth(euser);
	eosio_assert(is_account(euser), "user account does not exist");
	//assumption : iuser always exists because he can call this when he logged in
	//transfer all PUB from iuser to euser (get internal asset and calling pub transfer)
	//asset balance = get_ibalance(iuser)
	//pubtransfer(iuser, 1, euser, 0, balance, memo);
}

void token::newaccount(account_name iuser){
	pubtbl pubtable(_self, _self);
	auto iter = pubtable.find(iuser);
	
	eosio_assert(iter == pubtable.end(), "account already exist");
	
	pubtable.emplace(_self, [&]( auto& pubtable){
		pubtable.user = iuser;
		pubtable.eos_account = N("");
		pubtable.balance = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "PUB")));
		pubtable.ink = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "INK")));			
	});
}
	
	void token::pubtransfer(account_name from, bool internalfrom, account_name to, bool internalto, asset balance, string memo){
		require_auth( _self );
		
		//Internal to internal case
		if(internalfrom == 1 && internalto == 1){
			//account validation
			pubtbl pubtable(_self, _self);
			auto iter = pubtable.find(from);
			eosio_assert(iter != pubtable.end(), "from account does not exist");
			iter = pubtable.find(to);
			eosio_assert(iter != pubtable.end(), "to account does not exist");
			
			save(to, balance);
			draw(from, balance);
		}
		
		if(internalfrom == 0 && internalto == 1){
			//external to internal
			//check whether it is mapped to external then
			//calling external to external
			pubtbl pubtable(_self, _self);
			auto iter = pubtable.find(to);
			eosio_assert(iter != pubtable.end(), "to account does not exist");
			
			const auto& st = *iter;
			if(st.eos_account != N("")){
				itransfer(from, st.eos_account, balance, memo);
			}else{			
				itransfer(from, N(eoscafekorea), balance, memo);
				save(to, balance);
			}
			
		}
		
		if(internalfrom == 1 && internalto == 0){
			//internal to external
			pubtbl pubtable(_self, _self);
			auto iter = pubtable.find(from);
			eosio_assert(iter != pubtable.end(), "from account does not exist");
			
			const auto& st = *iter;
			if(st.eos_account != N("")){
				itransfer(st.eos_account, to , balance, memo);
			}else{
				itransfer(N(eoscafekorea), from, balance, memo);
				draw(from, balance);			
			}
		}
		
		//if(internalfrom == 0 && internalto == 0){
			//external transfer
			itransfer(from, to, balance, memo);
		//}
	}
	
	

void token::create( account_name issuer,
                    asset        maximum_supply )
{
    require_auth( _self );

    auto sym = maximum_supply.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( maximum_supply.is_valid(), "invalid supply");
    eosio_assert( maximum_supply.amount > 0, "max-supply must be positive");

    stat statstable( _self, sym.name() );
    auto existing = statstable.find( sym.name() );
    eosio_assert( existing == statstable.end(), "token with symbol already exists" );

    statstable.emplace( _self, [&]( auto& s ) {
       s.supply.symbol = maximum_supply.symbol;
       s.max_supply    = maximum_supply;
       s.issuer        = issuer;
    });
}


void token::issue( account_name to, asset quantity, string memo )
{
    auto sym = quantity.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    auto sym_name = sym.name();
    stat statstable( _self, sym_name );
    auto existing = statstable.find( sym_name );
    eosio_assert( existing != statstable.end(), "token with symbol does not exist, create token before issue" );
    const auto& st = *existing;

    require_auth( st.issuer );
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must issue positive quantity" );

    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

    statstable.modify( st, 0, [&]( auto& s ) {
       s.supply += quantity;
    });

    add_balance( st.issuer, quantity, st.issuer );

    if( to != st.issuer ) {
       SEND_INLINE_ACTION( *this, transfer, {st.issuer,N(active)}, {st.issuer, to, quantity, memo} );
    }
}

void token::transfer( account_name from,
                      account_name to,
                      asset        quantity,
                      string       memo )
{
    eosio_assert( from != to, "cannot transfer to self" );
    require_auth( from );
    eosio_assert( is_account( to ), "to account does not exist");
    
	
    auto sym = quantity.symbol.name();
    stat statstable( _self, sym );
    const auto& st = statstable.get( sym );
	
	//check whether from is locked or not in the case of PUB token
	if(quantity.symbol.name() == st.supply.symbol.name()){
		locktbl2 lockuptable( _self, _self );
		auto existing = lockuptable.find( from );
		if(existing != lockuptable.end()){
			if(existing->lockup_period == 0){
				eosio_assert( existing == lockuptable.end(), "send lockup is enabled" );
			}else{				
				asset allow_amount = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "DAB")));
				asset current_amount = get_balance(from, allow_amount.symbol.name());
				
				uint32_t t1 = existing->start_time;
				uint32_t t2 = now();
				//converting to hour
				t2 = (t2 - t1) / (60*60*24*30); //converting to milli seconds to 30days
				//t2 = (t2 - t1) / 60; //converting to milli seconds to minutes for testing
				if(t2 == 0){
					eosio_assert(false, "send lock is enable");
				}else if(t2 > existing->lockup_period){
					;//do nothing. Lock period expired
				}else{
					//lockup period is valid
					if(current_amount <= existing->initial_amount){
						allow_amount = ((existing->initial_amount * t2) / existing->lockup_period) - 
								(existing->initial_amount - current_amount);
						eosio_assert(allow_amount.amount >= quantity.amount, "send lock is enable");
					}else{
						allow_amount = ((existing->initial_amount * t2) /
								existing->lockup_period) + 
								(current_amount - existing->initial_amount);								
						eosio_assert(allow_amount.amount >= quantity.amount, "send lock is enable");
					}
				}
			}
		}
		
	}

    require_recipient( from );
    require_recipient( to );

    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    auto payer = has_auth( to ) ? to : from;

    sub_balance( from, quantity );
    add_balance( to, quantity, payer );
}
	
void token::itransfer( account_name from,
                      account_name to,
                      asset        quantity,
                      string       memo )
{
    eosio_assert( from != to, "cannot transfer to self" );
    eosio_assert( is_account( to ), "to account does not exist");
    
	
    auto sym = quantity.symbol.name();
    stat statstable( _self, sym );
    const auto& st = statstable.get( sym );
	
	//check whether from is locked or not in the case of PUB token
	if(quantity.symbol.name() == st.supply.symbol.name()){
		locktbl2 lockuptable( _self, _self );
		auto existing = lockuptable.find( from );
		if(existing != lockuptable.end()){
			if(existing->lockup_period == 0){
				eosio_assert( existing == lockuptable.end(), "send lockup is enabled" );
			}else{				
				asset allow_amount = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "DAB")));
				asset current_amount = get_balance(from, allow_amount.symbol.name());
				
				uint32_t t1 = existing->start_time;
				uint32_t t2 = now();
				//converting to hour
				t2 = (t2 - t1) / (60*60*24*30); //converting to milli seconds to 30days
				//t2 = (t2 - t1) / 60; //converting to milli seconds to minutes for testing
				if(t2 == 0){
					eosio_assert(false, "send lock is enable");
				}else if(t2 > existing->lockup_period){
					;//do nothing. Lock period expired
				}else{
					//lockup period is valid
					if(current_amount <= existing->initial_amount){
						allow_amount = ((existing->initial_amount * t2) / existing->lockup_period) - 
								(existing->initial_amount - current_amount);
						eosio_assert(allow_amount.amount >= quantity.amount, "send lock is enable");
					}else{
						allow_amount = ((existing->initial_amount * t2) /
								existing->lockup_period) + 
								(current_amount - existing->initial_amount);								
						eosio_assert(allow_amount.amount >= quantity.amount, "send lock is enable");
					}
				}
			}
		}
		
	}

    require_recipient( from );
    require_recipient( to );

    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    auto payer = has_auth( to ) ? to : from;

    sub_balance( from, quantity );
    add_balance( to, quantity, payer );
}
  
void token::lock( account_name user, uint32_t period){
	
	eosio_assert( is_account( user ), "lock account does not exist");

	require_auth( _self ); //only contract owner can do this
	locktbl2 lockuptable( _self, _self );
	
	auto iter=lockuptable.find(user);
	
	if(iter == lockuptable.end()){
		//asset quantity = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "DAB")));
		symbol_type temp = eosio::symbol_type(eosio::string_to_symbol(4, "DAB"));
		asset quantity = get_balance(user, temp.name());
		lockuptable.emplace( _self, [&]( auto& lockuptable ) {
			lockuptable.user = user;
			lockuptable.initial_amount = quantity;
			lockuptable.lockup_period = period;
			lockuptable.start_time = now();
		});
	}else{
		eosio_assert(iter==lockuptable.end(), "lock account already exists in the table");
	}
}
	
void token::unlock( account_name user){
	eosio_assert( is_account( user ), "unlock account does not exist");
	require_auth( _self );
	locktbl2 lockuptable(_self, _self);
	auto itr = lockuptable.find(user);
	eosio_assert(itr != lockuptable.end(), "there is no matched unlock account in the table");
	lockuptable.erase(itr);	
}
	

void token::sub_balance( account_name owner, asset value ) {
   accounts from_acnts( _self, owner );

   const auto& from = from_acnts.get( value.symbol.name(), "no balance object found" );
   eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );

   from_acnts.modify( from, owner, [&]( auto& a ) {
         a.balance -= value;
      });
}

void token::add_balance( account_name owner, asset value, account_name ram_payer )
{
   accounts to_acnts( _self, owner );
   auto to = to_acnts.find( value.symbol.name() );
   if( to == to_acnts.end() ) {
      to_acnts.emplace( ram_payer, [&]( auto& a ){
        a.balance = value;
      });
   } else {
      to_acnts.modify( to, 0, [&]( auto& a ) {
        a.balance += value;
      });
   }
}
	void token::save(account_name user, asset quantity){
		pubtbl pubtable(_self, _self);
		auto iter = pubtable.find(user);
		
		eosio_assert(iter != pubtable.end(), "account does not exist");
		
		pubtable.modify(iter, _self, [&]( auto& pubtable ) {
			pubtable.balance += quantity;
		});
	}
	
	void token::draw(account_name user, asset quantity){
		pubtbl pubtable(_self, _self);
		auto iter = pubtable.find(user);
		
		eosio_assert(iter != pubtable.end(), "account does not exist");
		
		pubtable.modify(iter, _self, [&]( auto& pubtable ) {
			pubtable.balance += quantity;
		});
	}
		
		


	
	

		
	


} /// namespace eosio

EOSIO_ABI( eosio::token, (create)(issue)(transfer)(lock)(unlock)(newaccount)(check)(pubtransfer))
