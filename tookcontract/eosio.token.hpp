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

         void create( account_name issuer,
                      asset        maximum_supply);

         void issue( account_name to, asset quantity, string memo );

         void transfer( account_name from,
                        account_name to,
                        asset        quantity,
                        string       memo );
         //@abi action
         void lock(account_name user, uint32_t period, string memo);
         //@abi action
         void unlock(account_name user);
	 
	 //@abi action
	 void newaccount(account_name iuser);

	 //@abi action
	 void stake(account_name from, account_name to,asset quantity);	   
	 //@abi action
	 void unstake(account_name from, account_name to, asset quantity);
	 //@abi action
	 void refund(account_name from, account_name user);
	   
	 //@abi action
         void updatetp(account_name user, asset quantity);
	   
	 //@abi action
	 void give(account_name from, account_name to, asset quantity, string event_case, string ttconid);
	 
      
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
      
         //@abi table locktbl2 i64
         struct lockup_list {
            account_name user;
            asset initial_amount;
            uint32_t lockup_period;
            uint32_t start_time;
            string memo;
            
            uint64_t primary_key()const {return user;}
            EOSLIB_SERIALIZE(lockup_list,(user)(initial_amount)(lockup_period)(start_time)(memo))
         };
	   
	 //@abi table maptbl i64
	 struct map_table {
		 account_name euser;
		 account_name iuser;
		 
		 uint64_t primary_key()const {return euser;}
		 EOSLIB_SERIALIZE(map_table,(euser)(iuser))
	 };
	   
	 //@abi table tooktbl3 i64
         struct took_table {
            account_name user;
            account_name eos_account;
            asset tookp_balance;
	    asset stake_sum;
	    asset air;	         
            uint64_t status;
            uint64_t primary_key()const {return user;}
            EOSLIB_SERIALIZE(took_table,(user)(eos_account)(tookp_balance)(stake_sum)(air)(status))
         };
	 //@abi table staketbl i64  
	 struct stake_table {
	    account_name user;
	    asset balance;
	    uint32_t staked_at;
		   
	    uint64_t primary_key()const {return user;}
	    EOSLIB_SERIALIZE(stake_table,(user)(balance)(staked_at))
	  }; 
	   
	  //@abi table unstaketbl i64
	  struct unstake_table {
	    account_name user;
	    asset balance;
	    uint32_t unstaked_at;
		   
	    uint64_t primary_key()const {return user;}
	    EOSLIB_SERIALIZE(unstake_table,(user)(balance)(unstaked_at))
	  }; 
	 

         typedef eosio::multi_index<N(accounts), account> accounts;
         typedef eosio::multi_index<N(stat), currency_stat> stat;
         typedef eosio::multi_index<N(locktbl2), lockup_list> locktbl2;
	   
	 typedef eosio::multi_index<N(tooktbl3), took_table> tooktbl3;
	 typedef eosio::multi_index<N(staketbl3), stake_table> staketbl;
	 typedef eosio::multi_index<N(unstaketbl), unstake_table> unstaketbl;
	 typedef eosio::multi_index<N(maptbl), map_table> maptbl;

         void sub_balance( account_name owner, asset value );
         void add_balance( account_name owner, asset value, account_name ram_payer );
	   
	 void sub_balance2( account_name owner, asset value );
         void add_balance2( account_name owner, asset value, account_name ram_payer );
	 void itransfer( account_name from, account_name to, asset quantity, string memo );
	 

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
