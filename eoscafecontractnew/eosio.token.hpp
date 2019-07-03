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
	 using contract::contract;

	 [[eosio::action]]
         void create( name issuer,
                      asset        maximum_supply);

	 [[eosio::action]]
         void issue( name to, asset quantity, string memo );

	 [[eosio::action]]
         void transfer( name from,
                        name to,
                        asset        quantity,
                        string       memo );
	 [[eosio::action]]
         void lock(name user, uint32_t period, string memo);
	 [[eosio::action]]
         void unlock(name user);
	 [[eosio::action]]
         void claim(name user);
	 [[eosio::action]]
         void collect(name user, asset value);
	 [[eosio::action]]
         void delaccount(name user);
	 [[eosio::action]]
	 void change(asset maximum_supply);
	 [[eosio::action]]
	 void post(name author, string content, string link);
	 [[eosio::action]]
	 void vote(name from, name to, string link);
	 [[eosio::action]]
	 void reply(name author, name to, string content, string link);
	 [[eosio::action]]
	 void payout(name to, asset quantity, string remarks);
	 
	  
         
      
      
         inline asset get_supply( symbol_code sym )const;
         
         inline asset get_balance( name owner, symbol_code sym )const;

      private:
	 struct [[eosio::table]] account {
            asset    balance;
			 
            uint64_t primary_key()const { return balance.symbol.code().raw(); }
         };
	 struct [[eosio::table]]  currency_stat {
            asset          supply;
            asset          max_supply;
            name   issuer;

            uint64_t primary_key()const { return supply.symbol.code().raw(); }
         };
      
	 struct [[eosio::table]]  lockup_list {
            name user;
            asset initial_amount;
            uint32_t lockup_period;
            uint32_t start_time;
            string memo;
            
            uint64_t primary_key()const {return user.value;}
            EOSLIB_SERIALIZE(lockup_list,(user)(initial_amount)(lockup_period)(start_time)(memo))
         };
	   
	 struct [[eosio::table]]  claim_list  {
            name    user;
			 
            uint64_t primary_key()const { return user.value; }
         };

         typedef eosio::multi_index< "accounts"_n, account > accounts;
         typedef eosio::multi_index< "stat"_n, currency_stat > stat;
         typedef eosio::multi_index< "locktbl2"_n, lockup_list > locktbl2;
	     typedef eosio::multi_index< "claimtbl"_n, claim_list > claimtbl;

         void sub_balance( name owner, asset value );
         void add_balance( name owner, asset value, name ram_payer );
	     void make_claim( name user);

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
      stat statstable( _self, sym.raw() );
      const auto& st = statstable.get( sym.raw() );
      return st.supply;
   }

   asset token::get_balance( name owner, symbol_code sym )const
   {
      accounts accountstable( _self, owner.value );
      const auto& ac = accountstable.get( sym.raw() );
      return ac.balance;
   }

} /// namespace eosio
