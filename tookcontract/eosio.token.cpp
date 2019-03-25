/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include "eosio.token.hpp"

namespace eosio {
	

void token::prepare(account_name euser, account_name iuser, string memo){
	require_auth(euser);
	
	maptbl maptable(_self, _self);
	auto iterMap = maptable.find(euser);
	
	eosio_assert(iterMap == maptable.end(), "external account already exist");
	
	maptable.emplace(_self, [&]( auto& a){
		a.iuser = iuser;
		a.euser = euser;
	});
	
	tooktbl3 tooktable(_self, iuser);
	auto iter = tooktable.find(iuser);
	tooktable.modify(iter, _self, [&]( auto& a ) {
		a.eos_account = euser;
		a.status = 1;
	});
}
	
void token::check(account_name euser, account_name iuser, string memo){
	require_auth(_self);
	eosio_assert(is_account(euser), "euser account does not exist");
	
	maptbl maptable(_self, _self);
	auto iterMap = maptable.find(euser);
	eosio_assert(iterMap != maptable.end(), "external account does not exist");
	
	tooktbl3 tooktable(_self, iuser);
	auto iter = tooktable.find(iuser);
	
	//transfer TookP to TOOK from internal account to external account
	if(iter->tookp_balance.amount > 0){
		itransfer(N(taketooktook), euser, iter->tookp_balance,"link internal account to external account");
		tooktable.modify( iter, _self, [&]( auto& a ) {
			a.tookp_balance = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "TOOK")));
		});
	}
	//change connection status
	tooktable.modify(iter, _self, [&]( auto& a ) {
		a.status = 2;
	});

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
  
//Prevent non-negotiated listing (S) 2018.11.27
	
//Newdex Case
    eosio_assert( to != N(newdexpocket), "You can not transfer to Newdex in a certain period");	

//WhaleEX
	eosio_assert( to != N(whaleextrust), "You can not transfer to this exchange in a certain period");
	eosio_assert( to != N(heydcmjrhege), "You can not transfer to this exchange in a certain period");
	
	eosio_assert( from != N(whaleextrust), "You can not transfer to this exchange in a certain period");
	eosio_assert( from != N(heydcmjrhege), "You can not transfer to this exchange in a certain period");
	//Btex
	eosio_assert( to != N(eosbtexbonus), "You can not transfer to this exchange in a certain period");
	eosio_assert( to != N(eosconvertbt), "You can not transfer to this exchange in a certain period");
	eosio_assert( to != N(eosbtexteams), "You can not transfer to this exchange in a certain period");
	eosio_assert( to != N(btexexchange), "You can not transfer to this exchange in a certain period");
	eosio_assert( to != N(eosbtextoken), "You can not transfer to this exchange in a certain period");
	eosio_assert( to != N(eosbtexfunds), "You can not transfer to this exchange in a certain period");
	
	eosio_assert( from != N(eosbtexbonus), "You can not transfer to this exchange in a certain period");
	eosio_assert( from != N(eosconvertbt), "You can not transfer to this exchange in a certain period");
	eosio_assert( from != N(eosbtexteams), "You can not transfer to this exchange in a certain period");
	eosio_assert( from != N(btexexchange), "You can not transfer to this exchange in a certain period");
	eosio_assert( from != N(eosbtextoken), "You can not transfer to this exchange in a certain period");
	eosio_assert( from != N(eosbtexfunds), "You can not transfer to this exchange in a certain period");
	
	//lockup
	eosio_assert( to != N(locktooktook), "You can not transfer to this exchange in a certain period");
	eosio_assert( to != N(goodtooktook), "You can not transfer to this exchange in a certain period");
	
	eosio_assert( from != N(locktooktook), "You can not transfer to this exchange in a certain period");
	eosio_assert( from != N(goodtooktook), "You can not transfer to this exchange in a certain period");
	
	//Prevent non-negotiated listing (E)
	
	//checking lockup(S)
	locktbl2 lockuptable( _self, _self );
	auto lockup_from = lockuptable.find(from);
	eosio_assert(lockup_from == lockuptable.end(), "From acocunt is locked, ask tooktook admin");
	auto lockup_to = lockuptable.find(to);
	eosio_assert(lockup_to == lockuptable.end(), "To cocunt is locked, ask tooktook admin");


	//checking lockup(E)

    require_auth( from );
    eosio_assert( is_account( to ), "to account does not exist");
    auto sym = quantity.symbol.name();
    stat statstable( _self, sym );
    const auto& st = statstable.get( sym );

    require_recipient( from );
    require_recipient( to );

    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );


    sub_balance( from, quantity );
    add_balance( to, quantity, from );
}

void token::lock( account_name user, uint32_t period, string memo){
	
	eosio_assert( is_account( user ), "lock account does not exist");

	require_auth( _self ); //only contract owner can do this
	locktbl2 lockuptable( _self, _self );
	
	auto iter=lockuptable.find(user);
	
	if(iter == lockuptable.end()){		
		symbol_type temp = eosio::symbol_type(eosio::string_to_symbol(4, "TOOK"));
		asset quantity = get_balance(user, temp.name());
		lockuptable.emplace( _self, [&]( auto& lockuptable ) {
			lockuptable.user = user;
			lockuptable.initial_amount = quantity;
			lockuptable.lockup_period = period;
			lockuptable.start_time = now();
			lockuptable.memo = memo;
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

void token::delaccount(account_name euser){
	require_auth(_self);
	maptbl maptable(_self, _self);
	auto iterMap = maptable.find(euser);
	eosio_assert(iterMap != maptable.end(), "nothing to delete");
	
	account_name iuser = iterMap-> iuser;
	tooktbl3 tooktable(_self, iuser);
	auto iter = tooktable.find(iuser);
	if(iter != tooktable.end()){
		tooktable.modify(iter_self, [&]( auto& a ) {
			a.status = 0;
			a.eos_account = N("");
		});
	}


}

void token::newaccount(account_name iuser){
	require_auth( _self );
	
	tooktbl3 tooktable(_self, iuser);
	auto iter = tooktable.find(iuser);
	
	eosio_assert(iter == tooktable.end(), "account already exist");
	
	tooktable.emplace(_self, [&]( auto& tooktable){
		tooktable.user = iuser;
		tooktable.eos_account = N("");
		tooktable.tookp_balance = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "TOOKP")));
		tooktable.stake_sum = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "TOOK")));
		tooktable.air = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "AIR")));
		tooktable.status = 0;
	});	
}

void token::stake(account_name from, account_name to, asset quantity){
	require_auth( _self );
	
	tooktbl3 tookTableTo(_self, to);
	auto iterTo = tookTableTo.find(to);
	eosio_assert(iterTo != tookTableTo.end(), "to account does not exist");
	
	tooktbl3 tookTableFrom(_self, from);
	auto iterFrom = tookTableFrom.find(from);
	eosio_assert(iterFrom != pubtable.end(), "from account does not exist");
	
	staketbl stakeTable(_self, from);
	auto iterStake = stakeTable.find(to);
	
	//after cheching precondition, then move token
	//Only account which connected to external account can stake TOOK
	if(iterFrom->eos_account != N("")){
		itransfer(iterFrom->eos_account, N(taketooktook), quantity, "stake event");
	}
	
	//update stakesum field
	iterTo->stake_sum += quantity;
	
	//update stake table (emplace or modify)
	if(iterStake == stakeTable.end()){
		stakeTable.emplace( _self, [&]( auto& a){
			a.balance = quantity;
			a.staked_at = now();
			a.user = to;
		});
	}else{
		stakeTable.modify(iterStake, _self, [&]( auto& a ) {
			a.balance += quantity;
			a.staked_at = now();
		});
	}
}
	
void token::unstake(account_name from, account_name to, asset quantity){
	require_auth( _self );
	
	tooktbl3 tookTableTo(_self, to);
	auto iterTo = tookTableTo.find(to);
	eosio_assert(iterTo != tookTableTo.end(), "to account does not exist");
	
	tooktbl3 tookTableFrom(_self, from);
	auto iterFrom = tookTableFrom.find(from);
	eosio_assert(iterFrom != pubtable.end(), "from account does not exist");
	
	staketbl stakeTable(_self, from);
	auto iterStake = stakeTable.find(to);
	eosio_assert(iterStake != stakeTable.end(), "there is no staked amount to unstake");
	
	eosio_assert(iterStake->balance.amount >= quantity.amount, "unstake amount overdue");
	
	//decrease stake amount
	stakeTable.modify(iterStake, _self, [&]( auto& a ) {
		a.balance.amount -= quantity.amount;
	});
	//delete stake table when remaining amount is zero
	if(iterStaker->balance.amount == 0){
		stakeTable.erase(iterStaker);
	}
	//decrease amount of stakesum field
	iterTo->balance -= quantity;
	
	//update or insert unstake table
	unstaketbl unstakeTable (_self, from);
	auto iterUnstake = unstakeTable.find(to);
	
	if(iterUnstake == unstakeTable.end()){
		unstakeTable.emplace( _self, [&]( auto& a) {
			a.balance = quantity;
			a.unstaked_at = now();
			a.user = to;				
		});
	}else{
		unstakeTable.modify(iterUnstake, _self, [&]( auto& a ) {
			a.balance += quantity;
			a.unstaked_at = now();
		});
	}

}
	
void token::refund(account_name from, account_name to){
	require_auth( _self );
	
	unstaketbl unstakeTable(_self, from);
	auto iterUnstake = unstake_table.find(user);
	
	tooktbl3 tookTableFrom(_self, from);
	auto iterTo = tookTableFrom.find(from);
	
	if(iterTo->eos_account == N("")){
		eosio_assert(0,"refund will not work for internal account");
	}else{
		itransfer(N(taketooktook), iterTo->eos_account , iterUnstake->balance, "refund");
	}
	unstakeTable.erase(iterUnstake);
}

void token::updatetp(account_name user, asset quantity){
	require_auth( _self );
	
	tooktbl3 tooktable(_self, user);
	auto iter = tooktable.find(user);
	eosio_assert(iter != tooktable.end(), "account does not exist");
	
	tooktable.modify(iter, _self, [&]( auto& tooktable ) {
		tooktable.tookp_balance = quantity;
	});
}
	
void token::give(account_name from, account_name to, asset quantity, string event_case, string ttconid){
	require_auth( _self );
}

void token::itransfer( account_name from,
                     account_name to,
                     asset        quantity,
                     string       memo )
{
	

	//require_auth( _self );
    eosio_assert( from != to, "cannot transfer to self" );
    eosio_assert( is_account( to ), "to account does not exist");
    
	
    auto sym = quantity.symbol.name();
    stat statstable( _self, sym );
    const auto& st = statstable.get( sym );
	
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );



    sub_balance2( from, quantity );
    add_balance2( to, quantity, from );

}
	
void token::sub_balance2( account_name owner, asset value ) {
   accounts from_acnts( _self, owner );

   const auto& from = from_acnts.get( value.symbol.name(), "no balance object found" );
   eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );

   //from_acnts.modify( from, owner, [&]( auto& a ) {
   if( from.balance.amount == value.amount ) {
      from_acnts.erase( from );
   } else {
	from_acnts.modify( from, _self, [&]( auto& a ) {
        a.balance -= value;
      	});
   }
}

void token::add_balance2( account_name owner, asset value, account_name ram_payer )
{
   accounts to_acnts( _self, owner );
   auto to = to_acnts.find( value.symbol.name() );
   if( to == to_acnts.end() ) {
      //to_acnts.emplace( ram_payer, [&]( auto& a ){
	   to_acnts.emplace( _self, [&]( auto& a ){
        a.balance = value;
      });
   } else {
      to_acnts.modify( to, 0, [&]( auto& a ) {
        a.balance += value;
      });
   }
}
	

void token::sub_balance( account_name owner, asset value ) {
   accounts from_acnts( _self, owner );

   const auto& from = from_acnts.get( value.symbol.name(), "no balance object found" );
   eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );


   if( from.balance.amount == value.amount ) {
      from_acnts.erase( from );
   } else {
      from_acnts.modify( from, owner, [&]( auto& a ) {
          a.balance -= value;
      });
   }
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

} /// namespace eosio

EOSIO_ABI( eosio::token, (create)(issue)(transfer)(lock)(unlock)(newaccount)(stake)(unstake)(refund)(updatetp)(give)(prepare)(check)(delaccount))
