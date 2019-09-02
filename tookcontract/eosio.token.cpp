/**
 *  @file
 *  @copyright defined in LICENSE.txt
 */

#include "eosio.token.hpp"

namespace eosio {
	

void token::prepare(name euser, name iuser, string memo){
	require_auth(euser);
	
	maptbl maptable(_self, _self.value);
	auto iterMap = maptable.find(euser.value);
	
	check(iterMap == maptable.end(), "external account already exist");
	
	maptable.emplace(_self, [&]( auto& a){
		a.iuser = iuser;
		a.euser = euser;
	});
	
	tooktbl3 tooktable(get_self(), iuser.value);
	auto iter = tooktable.find(iuser.value);
	tooktable.modify(iter, _self, [&]( auto& a ) {
		a.eos_account = euser;
		a.status = 1;
	});
}
	
void token::check2(name euser, name iuser, string memo){
	require_auth(_self);
	check(is_account(euser), "euser account does not exist");
	
	maptbl maptable(_self, _self.value);
	auto iterMap = maptable.find(euser.value);
	check(iterMap != maptable.end(), "external account does not exist");
	
	tooktbl3 tooktable(_self, iuser.value);
	auto iter = tooktable.find(iuser.value);
	
	//transfer TookP to TOOK from internal account to external account
	if(iter->tookp_balance.amount > 0){
		/*
		std:string sym = "TOOK";
		symbol_type symbolvalue = string_to_symbol(4,sym.c_str());
		eosio::asset tosend;
		tosend.amount = iter->tookp_balance.amount * 10000;
		tosend.symbol = symbolvalue;
		*/
		itransfer("taketooktook"_n, euser, asset(iter->tookp_balance.amount, symbol(symbol_code("TOOK"), 4)), "link internal account to external account");
		tooktable.modify( iter, _self, [&]( auto& a ) {
			a.tookp_balance = asset(0, symbol(symbol_code("TOOKP"),4));
		});
	}
	//change connection status
	tooktable.modify(iter, _self, [&]( auto& a ) {
		a.status = 2;
	});

}
	
	

void token::create( name issuer,
                    asset        maximum_supply )
{
    require_auth( _self );

    auto sym = maximum_supply.symbol;
    check( sym.is_valid(), "invalid symbol name" );
    check( maximum_supply.is_valid(), "invalid supply");
    check( maximum_supply.amount > 0, "max-supply must be positive");

    stat statstable( _self, sym.code().raw() );
    auto existing = statstable.find( sym.core().raw );
    check( existing == statstable.end(), "token with symbol already exists" );

    statstable.emplace( _self, [&]( auto& s ) {
       s.supply.symbol = maximum_supply.symbol;
       s.max_supply    = maximum_supply;
       s.issuer        = issuer;
    });
}
	
void token::change( name issuer,
                    asset        maximum_supply )
{
    require_auth( _self );

    auto sym = maximum_supply.symbol;
    check( sym.is_valid(), "invalid symbol name" );
    check( maximum_supply.is_valid(), "invalid supply");
    check( maximum_supply.amount > 0, "max-supply must be positive");

    stat statstable( _self, sym.code().raw() );
    auto existing = statstable.find( sym.code().raw() );
    

    statstable.modify( existing, _self, [&]( auto& s ) {
       s.supply.symbol = maximum_supply.symbol;
       s.max_supply    = maximum_supply;
       s.issuer        = issuer;
    });
}


void token::issue( name to, asset quantity, string memo )
{
    auto sym = quantity.symbol;
    check( sym.is_valid(), "invalid symbol name" );
    check( memo.size() <= 256, "memo has more than 256 bytes" );

    auto sym_name = sym.name();
    stat statstable( _self, sym_name );
    auto existing = statstable.find( sym_name );
    check( existing != statstable.end(), "token with symbol does not exist, create token before issue" );
    const auto& st = *existing;

    require_auth( st.issuer );
    check( quantity.is_valid(), "invalid quantity" );
    check( quantity.amount > 0, "must issue positive quantity" );

    check( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    check( quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

    statstable.modify( st, 0, [&]( auto& s ) {
       s.supply += quantity;
    });

    add_balance( st.issuer, quantity, st.issuer );

    if( to != st.issuer ) {
       SEND_INLINE_ACTION( *this, transfer, {st.issuer,"active"_n}, {st.issuer, to, quantity, memo} );
    }
}

void token::transfer( name from,
                      name to,
                      asset        quantity,
                      string       memo )
{
    check( from != to, "cannot transfer to self" );
  
//Prevent non-negotiated listing (S) 2018.11.27
	
//Newdex Case
    check( to != "newdexpocket"_n, "You can not transfer to Newdex in a certain period");	

//WhaleEX
	check( to != "whaleextrust"_n, "You can not transfer to this exchange in a certain period");
	check( to != "heydcmjrhege"_n, "You can not transfer to this exchange in a certain period");
	
	check( from != "whaleextrust"_n, "You can not transfer to this exchange in a certain period");
	check( from != "heydcmjrhege, "You can not transfer to this exchange in a certain period");
	//Btex
	check( to != "eosbtexbonus"_n, "You can not transfer to this exchange in a certain period");
	check( to != "eosconvertbt"_n, "You can not transfer to this exchange in a certain period");
	check( to != "eosbtexteams"_n, "You can not transfer to this exchange in a certain period");
	check( to != "btexexchange"_n, "You can not transfer to this exchange in a certain period");
	check( to != "eosbtextoken"_n, "You can not transfer to this exchange in a certain period");
	check( to != "eosbtexfunds"_n, "You can not transfer to this exchange in a certain period");
	
	check( from != "eosbtexbonus"_n, "You can not transfer to this exchange in a certain period");
	check( from != "eosconvertbt"_n, "You can not transfer to this exchange in a certain period");
	check( from != "eosbtexteams"_n, "You can not transfer to this exchange in a certain period");
	check( from != "btexexchange"_n, "You can not transfer to this exchange in a certain period");
	check( from != "eosbtextoken"_n, "You can not transfer to this exchange in a certain period");
	check( from != "eosbtexfunds"_n, "You can not transfer to this exchange in a certain period");
	
	//lockup
	check( to != "locktooktook"_n), "You can not transfer to this exchange in a certain period");
	check( to != "goodtooktook"_n), "You can not transfer to this exchange in a certain period");
	
	check( from != "locktooktook"_n), "You can not transfer to this exchange in a certain period");
	check( from != "goodtooktook"_n), "You can not transfer to this exchange in a certain period");
	
	//Prevent non-negotiated listing (E)
	
	//checking lockup(S)
	locktbl2 lockuptable( _self, _self.value );
	auto lockup_from = lockuptable.find(from.value);
	check(lockup_from == lockuptable.end(), "From acocunt is locked, ask tooktook admin");
	auto lockup_to = lockuptable.find(to.value);
	check(lockup_to == lockuptable.end(), "To cocunt is locked, ask tooktook admin");


	//checking lockup(E)

    require_auth( from );
    check( is_account( to ), "to account does not exist");
    auto sym = quantity.symbol.code();
    stat statstable( _self, sym.raw() );
    const auto& st = statstable.get( sym.raw() );

    require_recipient( from );
    require_recipient( to );

    check( quantity.is_valid(), "invalid quantity" );
    check( quantity.amount > 0, "must transfer positive quantity" );
    check( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    check( memo.size() <= 256, "memo has more than 256 bytes" );


    sub_balance( from, quantity );
    add_balance( to, quantity, from );
}

void token::lock( name user, uint32_t period, string memo){
	
	check( is_account( user ), "lock account does not exist");

	require_auth( _self ); //only contract owner can do this
	locktbl2 lockuptable( _self, _self.value );
	
	auto iter=lockuptable.find(user);
	
	if(iter == lockuptable.end()){		
		symbol_type temp = symbol(symbol_code("TOOK")a,4);
		asset quantity = get_balance(user, temp.name());
		lockuptable.emplace( _self, [&]( auto& lockuptable ) {
			lockuptable.user = user;
			lockuptable.initial_amount = quantity;
			lockuptable.lockup_period = period;
			lockuptable.start_time = now();
			lockuptable.memo = memo;
		});
	}else{
		check(iter==lockuptable.end(), "lock account already exists in the table");
	}
}

void token::unlock( name user){
	check( is_account( user ), "unlock account does not exist");
	require_auth( _self );
	locktbl2 lockuptable(_self, _self.value);
	auto itr = lockuptable.find(user.value);
	check(itr != lockuptable.end(), "there is no matched unlock account in the table");
	lockuptable.erase(itr);	
}

void token::delaccount(name euser){
	require_auth(_self);
	maptbl maptable(_self, _self.value);
	auto iterMap = maptable.find(euser.value);
	check(iterMap != maptable.end(), "nothing to delete");
	
	name iuser = iterMap-> iuser;
	tooktbl3 tooktable(_self, iuser.value);
	auto iter = tooktable.find(iuser.value);
	if(iter != tooktable.end()){
		tooktable.modify(iter, _self, [&]( auto& a ) {
			a.status = 0;
			a.eos_account = N("");
		});
	}
	maptable.erase(iterMap);


}

void token::newaccount(name iuser){
	require_auth( _self );
	
	tooktbl3 tooktable(_self, iuser.value);
	auto iter = tooktable.find(iuser.value);
	
	check(iter == tooktable.end(), "account already exist");
	
	tooktable.emplace(_self, [&]( auto& tooktable){
		tooktable.user = iuser;
		tooktable.eos_account = N("");
		tooktable.tookp_balance = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "TOOKP")));
		tooktable.stake_sum = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "TOOK")));
		tooktable.air = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "AIR")));
		tooktable.status = 0;
	});	
}

void token::stake(name from, name to, asset quantity){
	require_auth( _self );
	
	tooktbl3 tookTableTo(_self, to.vallue);
	auto iterTo = tookTableTo.find(to.value);
	check(iterTo != tookTableTo.end(), "to account does not exist");
	
	tooktbl3 tookTableFrom(_self, from.value);
	auto iterFrom = tookTableFrom.find(from.value);
	check(iterFrom != tookTableFrom.end(), "from account does not exist");
	
	staketbl stakeTable(_self, from.value);
	auto iterStake = stakeTable.find(to.value);
	
	//after cheching precondition, then move token
	//Only account which connected to external account can stake TOOK
	if(iterFrom->eos_account != ""_n){
		itransfer(iterFrom->eos_account, "taketooktook"_n, quantity, "stake event");
	}
	
	//update stakesum field
	tookTableTo.modify(iterTo, _self, [&]( auto& a ) {
		a.stake_sum += quantity;
	});
	
	//update stake table (emplace or modify)
	if(iterStake == stakeTable.end()){
		stakeTable.emplace( _self, [&]( auto& a){
			a.balance = quantity;
			a.staked_at = eosio::current_time_point().sec_since_epoch();
			a.user = to;
		});
	}else{
		stakeTable.modify(iterStake, _self, [&]( auto& a ) {
			a.balance += quantity;
			a.staked_at = now();
		});
	}
}
	
void token::unstake(name from, name to, asset quantity){
	require_auth( _self );
	
	tooktbl3 tookTableTo(_self, to);
	auto iterTo = tookTableTo.find(to);
	check(iterTo != tookTableTo.end(), "to account does not exist");
	
	tooktbl3 tookTableFrom(_self, from);
	auto iterFrom = tookTableFrom.find(from);
	check(iterFrom != tookTableFrom.end(), "from account does not exist");
	
	staketbl stakeTable(_self, from);
	auto iterStake = stakeTable.find(to);
	check(iterStake != stakeTable.end(), "there is no staked amount to unstake");
	
	check(iterStake->balance.amount >= quantity.amount, "unstake amount overdue");
	
	//decrease stake amount
	stakeTable.modify(iterStake, _self, [&]( auto& a ) {
		a.balance.amount -= quantity.amount;
	});
	//delete stake table when remaining amount is zero
	if(iterStake->balance.amount == 0){
		stakeTable.erase(iterStake);
	}
	//decrease amount of stakesum field
	tookTableTo.modify(iterTo, _self, [&]( auto& a ) {
		a.stake_sum -= quantity;
	});
	
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
	
void token::refund(name from, name to){
	require_auth( _self );
	
	unstaketbl unstakeTable(_self, from);
	auto iterUnstake = unstakeTable.find(to);
	
	tooktbl3 tookTableFrom(_self, from);
	auto iterTo = tookTableFrom.find(from);
	
	if(iterTo->eos_account == N("")){
		check(0,"refund will not work for internal account");
	}else{
		itransfer(N(taketooktook), iterTo->eos_account , iterUnstake->balance, "refund");
	}
	unstakeTable.erase(iterUnstake);
}

void token::updatetp(name user, asset quantity){
	require_auth( _self );
	
	tooktbl3 tooktable(_self, user);
	auto iter = tooktable.find(user);
	check(iter != tooktable.end(), "account does not exist");
	
	tooktable.modify(iter, _self, [&]( auto& tooktable ) {
		tooktable.tookp_balance = quantity;
	});
}
	
void token::give(name from, name to, asset quantity, string event_case, string ttconid){
	require_auth( _self );
}

void token::itransfer( name from,
                     name to,
                     asset        quantity,
                     string       memo )
{
	

	//require_auth( _self );
    check( from != to, "cannot transfer to self" );
    check( is_account( to ), "to account does not exist");
    
	
    auto sym = quantity.symbol.code().raw();
    stat statstable( _self, sym );
    const auto& st = statstable.get( sym );
	
    check( quantity.is_valid(), "invalid quantity" );
    check( quantity.amount > 0, "must transfer positive quantity" );
    check( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    check( memo.size() <= 256, "memo has more than 256 bytes" );



    sub_balance2( from, quantity );
    add_balance2( to, quantity, from );

}
	
void token::sub_balance2( name owner, asset value ) {
   accounts from_acnts( _self, owner.value );

	   const auto& from = from_acnts.get( value.symbol.code().raw(), "no balance object found" );
   check( from.balance.amount >= value.amount, "overdrawn balance" );

   //from_acnts.modify( from, owner, [&]( auto& a ) {
   if( from.balance.amount == value.amount ) {
      from_acnts.erase( from );
   } else {
	from_acnts.modify( from, _self, [&]( auto& a ) {
        a.balance -= value;
      	});
   }
}

void token::add_balance2( name owner, asset value, name ram_payer )
{
   accounts to_acnts( _self, owner );
   auto to = to_acnts.find( value.symbol.code().raw() );
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
	

void token::sub_balance( name owner, asset value ) {
   accounts from_acnts( _self, owner );

   const auto& from = from_acnts.get( value.symbol.code().raw, "no balance object found" );
   check( from.balance.amount >= value.amount, "overdrawn balance" );


   if( from.balance.amount == value.amount ) {
      from_acnts.erase( from );
   } else {
      from_acnts.modify( from, owner, [&]( auto& a ) {
          a.balance -= value;
      });
   }
}

void token::add_balance( name owner, asset value, name ram_payer )
{
   accounts to_acnts( _self, owner );
   auto to = to_acnts.find( value.symbol.code().waw() );
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

EOSIO_DISPATCH( eosio::token, (create)(issue)(transfer)(lock)(unlock)(newaccount)(stake)(unstake)(refund)(updatetp)(give)(prepare)(check)(delaccount)(change))
