/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include "eosio.token.hpp"

namespace eosio {

void token::create( name issuer,
                    asset        maximum_supply )
{
    require_auth( get_self() );

    auto sym = maximum_supply.symbol;
    check( sym.is_valid(), "invalid symbol name" );
    check( maximum_supply.is_valid(), "invalid supply");
    check( maximum_supply.amount > 0, "max-supply must be positive");

    stat statstable( get_self(), sym.code().raw() );
    auto existing = statstable.find( sym.code().raw() );
    check( existing == statstable.end(), "token with symbol already exists" );

    statstable.emplace( get_self(), [&]( auto& s ) {
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

    auto sym_name = sym.code().raw();
    stat statstable( get_self(), sym_name );
    auto existing = statstable.find( sym_name );
    check( existing != statstable.end(), "token with symbol does not exist, create token before issue" );
    const auto& st = *existing;

    require_auth( st.issuer );
    check( quantity.is_valid(), "invalid quantity" );
    check( quantity.amount > 0, "must issue positive quantity" );

    check( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    check( quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

    statstable.modify( st, same_payer, [&]( auto& s ) {
       s.supply += quantity;
    });

    add_balance( st.issuer, quantity, st.issuer );

    if( to != st.issuer ) {
       SEND_INLINE_ACTION( *this, transfer, {st.issuer,"active"_n}, {st.issuer, to, quantity, memo} );
    }
}

void token::post(name author, string content, string link){
    require_auth( get_self() );
}
void token::vote(name from, name to, string link){
    require_auth( get_self() );
}
void token::reply(name author, name to, string content, string link){
    require_auth( get_self() );
}
void token::payout(name to, asset quantity, string remarks){
    require_auth( get_self() );
}
	
void token::change(asset maximum_supply ){
    require_auth( get_self() );

    auto sym = maximum_supply.symbol;   
    check( sym.is_valid(), "invalid symbol name" );
    check( maximum_supply.is_valid(), "invalid supply");
    check( maximum_supply.amount > 0, "max-supply must be positive");

    stat statstable( get_self(), sym.code().raw() );
    auto existing = statstable.find( sym.code().raw() );
    check( existing != statstable.end(), "token with symbol doesn't exists" );

    statstable.modify(existing, get_self(), [&](auto &s){
        s.max_supply    = maximum_supply;
    });
}

void token::transfer( name from,
                      name to,
                      asset        quantity,
                      string       memo )
{
    check( from != to, "cannot transfer to self" );
	
	//checking lockup(S)
	locktbl2 lockuptable( get_self(), get_self().value );
	auto lockup_from = lockuptable.find(from.value);
	check(lockup_from == lockuptable.end(), "From acocunt is locked, ask eoscafe admin");
	auto lockup_to = lockuptable.find(to.value);
	check(lockup_to == lockuptable.end(), "To cocunt is locked, ask eoscafe admin");
	//checking lockup(E)
	
	//skyhook marking(S)
	//if sender is not thebeantoken, then mark flag for skyhook
	//skyhook marking(E)

    require_auth( from );
    check( is_account( to ), "to account does not exist");
    auto sym = quantity.symbol.code().raw();
    stat statstable( get_self(), sym );
    const auto& st = statstable.get( sym );

    require_recipient( from );
    require_recipient( to );

    check( quantity.is_valid(), "invalid quantity" );
    check( quantity.amount > 0, "must transfer positive quantity" );
    check( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    check( memo.size() <= 256, "memo has more than 256 bytes" );


    sub_balance( from, quantity );
    add_balance( to, quantity, from );
	
	//making claim list
	if(from != "thebeantoken"_n)
		make_claim(from);
}

void token::lock( name user, uint32_t period, string memo){
	
	check( is_account( user ), "lock account does not exist");

	require_auth( get_self() ); //only contract owner can do this
	locktbl2 lockuptable( get_self(), get_self().value );
	
	auto iter=lockuptable.find(user.value);
	
	if(iter == lockuptable.end()){		
		lockuptable.emplace( get_self(), [&]( auto& lockuptable ) {
			lockuptable.user = user;
			lockuptable.lockup_period = period;
			lockuptable.start_time = eosio::current_time_point().sec_since_epoch();
			lockuptable.memo = memo;
		});
	}else{
		check(iter==lockuptable.end(), "lock account already exists in the table");
	}
}

void token::unlock( name user){
	check( is_account( user ), "unlock account does not exist");
	require_auth( get_self() );
	locktbl2 lockuptable(get_self(), get_self().value);
	auto itr = lockuptable.find(user.value);
	check(itr != lockuptable.end(), "there is no matched unlock account in the table");
	lockuptable.erase(itr);	
}
	
void token::claim( name user){
	require_auth(user);
	//get current balance of user
	accounts user_acnts( get_self(), user.value );
	asset temp = asset(0, symbol(symbol_code("BEAN"), 4));
	auto iter = user_acnts.find(temp.symbol.code().raw());
	if( iter == user_acnts.end() ) {
      user_acnts.emplace( user, [&]( auto& a ){
        a.balance = asset(0, symbol(symbol_code("BEAN"), 4));
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
	make_claim(user);
}
	
void token::collect( name user, asset value){
	require_auth( get_self() );
	//calling sub_balance and add_balance
	sub_balance(user, value);
	add_balance(get_self(), value, get_self()); 	
}
	
void token::delaccount(name user){
	require_auth(get_self());
	claimtbl claim_table(get_self(), get_self().value);
	auto iter = claim_table.find(user.value);
	
	if(iter != claim_table.end()){
		claim_table.erase(iter);
	}
}
	
void token::make_claim(name user){
	//make claim list
	claimtbl claim_table(get_self(), get_self().value);
	auto iter2 = claim_table.find(user.value);
	if(iter2 == claim_table.end()){
		claim_table.emplace(get_self(), [&]( auto& a ){
			a.user = user;
		});
	}
}


void token::sub_balance( name owner, asset value ) {
   accounts from_acnts( get_self(), owner.value );

   const auto& from = from_acnts.get( value.symbol.code().raw(), "no balance object found" );
   check( from.balance.amount >= value.amount, "overdrawn balance" );


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

void token::add_balance( name owner, asset value, name ram_payer )
{
   accounts to_acnts( get_self(), owner.value );
   auto to = to_acnts.find( value.symbol.code().raw() );
   if( to == to_acnts.end() ) {
      to_acnts.emplace( ram_payer, [&]( auto& a ){
        a.balance = value;
      });
   } else {
      to_acnts.modify( to, same_payer, [&]( auto& a ) {
        a.balance += value;
      });
   }
}

} /// namespace eosio

EOSIO_DISPATCH( eosio::token, (create)(issue)(transfer)(lock)(unlock)(claim)(collect)(delaccount)(change)(post)(vote)(reply)(payout) )
