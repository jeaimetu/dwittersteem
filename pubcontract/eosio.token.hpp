/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#pragma once

#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>

#include <string>

namespace eosiosystem {
   class system_contract;
}

namespace eosio {

   using std::string;

   class token : public contract {
      public:
         token( account_name self ):contract(self){}
	   
         //@abi action
         void check(account_name user, string memo);
         //@abi action
         void save(account_name user, asset quantity);
	     //@abi action
         void draw(account_name user, asset quantity);
	     //@abi action
         void stake(account_name from, account_name to, asset quantity);
	     //@abi action
         void unstake(account_name from,  account_name to, asset quantity);
	     //@abi action
         void update(account_name user);
	   
     

         inline asset get_supply( symbol_name sym )const;
         
         inline asset get_balance( account_name owner, symbol_name sym )const;

      private:
         //@abi table accounts i64
         struct account {
            asset    balance;

            uint64_t primary_key()const { return balance.symbol.name(); }
         };
         //@abi table stat i64
         struct currency_stat {
            asset          supply;
            asset          max_supply;
            account_name   issuer;

            uint64_t primary_key()const { return supply.symbol.name(); }
         };
      
         //@abi table pubtbl i64
         struct pub_table {
            account_name user;
            asset balance;
            asset staked;
            asset refund;
	    uint32_t updated_at;
	    uint32_t unstaked_at;
	    asset ink;
	    bool is_internal;
            
            uint64_t primary_key()const {return user;}
            EOSLIB_SERIALIZE(pub_table,(user)(balance)(staked)(refund)(updated_at)(unstaked_at)(ink)(is_internal))
         };
            

         typedef eosio::multi_index<N(accounts), account> accounts;
         typedef eosio::multi_index<N(stat), currency_stat> stat;
         typedef eosio::multi_index<N(pubtbl), pub_table> pubtbl;

         void sub_balance( account_name owner, asset value );
         void add_balance( account_name owner, asset value, account_name ram_payer );

      public:
         struct transfer_args {
            account_name  from;
            account_name  to;
            asset         quantity;
            string        memo;
         };
   };

   asset token::get_supply( symbol_name sym )const
   {
      stat statstable( _self, sym );
      const auto& st = statstable.get( sym );
      return st.supply;
   }

   asset token::get_balance( account_name owner, symbol_name sym )const
   {
      accounts accountstable( _self, owner );
      const auto& ac = accountstable.get( sym );
      return ac.balance;
   }

} /// namespace eosio
