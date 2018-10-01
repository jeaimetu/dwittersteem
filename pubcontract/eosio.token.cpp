/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include "eosio.token.hpp"

namespace eosio {

void token::check_account(account_name user, string memo){
	require_auth(user);
}

void token::save_pub(account_name user, asset quantity){
	require_auth(_self);
}

void token::draw_pub(account_name user, asset quantity){
	require_auth(_self);
}

void token::stake_pub(account_name from, account_name to, asset quantity){
	require_auth(from);
}

void token::unstake_pub(account_name from, account_name to, asset quantity){
	require_auth(from);
}

void token::unstake_ink(account_name from){
	require_auth(from);
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

} /// namespace eosio

EOSIO_ABI( eosio::token, (check_account)(save_pub)(draw_pub)(stake_pub)(unstake_pub)(update_ink) )
