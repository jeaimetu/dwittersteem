/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <eosio/system.hpp>

#include <string>

namespace eosiosystem {
   class system_contract;
}

namespace eosio {

   using std::string;

   class [[eosio::contract("eosio.token")]] token : public contract {
      public:
         [[eosio::action]]  
         void create( account_name issuer,
                      asset        maximum_supply);
	 [[eosio::action]]  
         void issue( account_name to, asset quantity, string memo );
	 
	 [[eosio::action]]  
         void transfer( account_name from,
                        account_name to,
                        asset        quantity,
                        string       memo );
         void postlimit( account_name from,
                         string time,
                         string memo);
	 [[eosio::action]]  
	 void post(string author, string content, string link);
	 [[eosio::action]]  
	 void vote(string from, string to, string link);
	 [[eosio::action]]  
	 void reply(string author, string to, string content, string link);
	 [[eosio::action]]  
	 void payout(string to, asset quantity, string remarks);
      
         inline asset get_supply( symbol_code sym )const;
         
         inline asset get_balance( account_name owner, symbol_code sym )const;

      private:

         struct [[eosio::table]] account {
            asset    balance;

            uint64_t primary_key()const { return balance.symbol.code().raw(); }
         };

	   struct [[eosio::table]] currency_stat {
            asset          supply;
            asset          max_supply;
            name   issuer;

            uint64_t primary_key()const { return supply.symbol.code().raw(); }
         };
      
           
         typedef eosio::multi_index<"accounts"_n, account> accounts;
         typedef eosio::multi_index<"stat"_n, currency_stat> stat;
      
      


         void sub_balance( name owner, asset value );
         void add_balance( name owner, asset value, name ram_payer );

      public:
         struct transfer_args {
            name  from;
            name  to;
            asset         quantity;
            string        memo;
         };
   };

   asset token::get_supply( symbol_code sym )const
   {
      stat statstable( get_self(), sym.raw() );
      const auto& st = statstable.get( sym.raw() );
      return st.supply;
   }

   asset token::get_balance( name owner, symbol_code  sym )const
   {
      accounts accountstable( get_self(), owner.value );
      const auto& ac = accountstable.get( sym.raw()  );
      return ac.balance;
   }

} /// namespace eosio
