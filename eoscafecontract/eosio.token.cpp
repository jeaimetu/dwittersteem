/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include "eosio.token.hpp"

namespace eosio {

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
	
	//checking lockup(S)
	locktbl2 lockuptable( _self, _self );
	auto lockup_from = lockuptable.find(from);
	eosio_assert(lockup_from == lockuptable.end(), "From acocunt is locked, ask eoscafe admin");
	auto lockup_to = lockuptable.find(to);
	eosio_assert(lockup_to == lockuptable.end(), "To cocunt is locked, ask eoscafe admin");
	//checking lockup(E)
	
	//skyhook marking(S)
	//if sender is not thebeantoken, then mark flag for skyhook
	//skyhook marking(E)

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
		lockuptable.emplace( _self, [&]( auto& lockuptable ) {
			lockuptable.user = user;
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
	
void token::claim( account_name user){
	require_auth(user);
	//get current balance of user
	accounts user_acnts( _self, user );
	asset temp = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "BEAN")));
	auto iter = user_acnts.find(temp.symbol.name());
	if( iter == user_acnts.end() ) {
      user_acnts.emplace( user, [&]( auto& a ){
        a.balance = asset(0, eosio::symbol_type(eosio::string_to_symbol(4, "BEAN")));
      });
    } else {
	   //save current balance
	   auto previous_balance = iter->balance;
	   //delete account table to return RAM
	   user_acnts.erase( iter );
	   //make new account table with from.balance.amount + value.
	   user_acnts.emplace( user,  [&]( auto& a ){
		   a.balance = previous_balance;
	   });
    }
	//make claim list
	claimtbl claim_table(_self, _self);
	auto iter2 = claim_table.find(user);
	if(iter2 == claim_table.end()){
		claim_table.emplace(_self, [&]( auto& a ){
			a.user = user;
		});
	}
	
}
	
void token::collect( account_name user){
	require_auth( _self );
	//todo 
	//decrease user balance, if it is empty, then delete the table
	//increase _self balance
}


void token::sub_balance( account_name owner, asset value ) {
   accounts from_acnts( _self, owner );

   const auto& from = from_acnts.get( value.symbol.name(), "no balance object found" );
   eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );


	//delete table always to return the RAM to the original payer
   if( from.balance.amount == value.amount ) {
      from_acnts.erase( from );
   } else {
	   //save current balance
	   auto previous_balance = from.balance;
	   //delete account table to return RAM
	   from_acnts.erase( from );
	   //make new account table with from.balance.amount + value.
	   from_acnts.emplace( owner,  [&]( auto& a ){
		   a.balance = (previous_balance - value);
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

EOSIO_ABI( eosio::token, (create)(issue)(transfer)(lock)(unlock)(claim)(collect) )
