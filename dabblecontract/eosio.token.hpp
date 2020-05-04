/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>


namespace eosiosystem {
   class system_contract;
}

namespace eosio {

   using std::string;

   class [[eosio::contract("eosio.token")]] token : public contract {
	   using contract::contract;
	   
      public:
         [[eosio::action]]  
         void create( const name&  issuer,
                      const asset&        maximum_supply);
	 [[eosio::action]]  
         void issue( const name&  to, const asset& quantity,const  string& memo );
	 
	 [[eosio::action]]  
         void transfer(const  name&  from,
                        const name&  to,
                        const asset&        quantity,
                        const string&       memo );
	 [[eosio::action]] 
         void postlimit( name  from,
                         string time,
                         string memo);
	 [[eosio::action]]  
	 void post(const string& author, const string& content, const string& link);
	 [[eosio::action]]  
	 void vote(string from, string to, string link);
	 [[eosio::action]]  
	 void reply(string author, string to, string content, string link);
	 [[eosio::action]]  
	 void payout(string to, asset quantity, string remarks);
      
         inline asset get_supply( symbol_code sym );
         
         inline asset get_balance( name  owner, symbol_code sym );

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

   asset token::get_supply( symbol_code sym )
   {
      stat statstable( get_self(), sym.raw() );
      const auto& st = statstable.get( sym.raw() );
      return st.supply;
   }

   asset token::get_balance( name owner, symbol_code  sym )
   {
      accounts accountstable( get_self(), owner.value );
      const auto& ac = accountstable.get( sym.raw()  );
      return ac.balance;
   }

} /// namespace eosio
