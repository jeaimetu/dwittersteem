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
         void lock(account_name user, uint32_t period);
         //@abi action
         void unlock(account_name user);
	   
         //@abi action
         void check(account_name euser, account_name iuser, string memo);
	   
	     //@abi action
	 void newaccount(account_name iuser);

	     //@abi action
         void stake(account_name from, bool internalfrom, account_name to, bool internalto, asset quantity);
	     //@abi action
         void unstake(account_name from, bool internalfrom, account_name to, bool internalto, asset quantity);
	     //@abi action
         void update(account_name user);
	 	 //@abi action
         void pubtransfer(account_name from, bool internalfrom, account_name to, bool internalto, asset balance, string memo);

         inline asset get_supply( symbol_name sym )const;
         
         inline asset get_balance( account_name owner, symbol_name sym )const;
	   
	   	 void itransfer( account_name from,
                        account_name to,
                        asset        quantity,
                        string       memo );

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
            
            uint64_t primary_key()const {return user;}
            EOSLIB_SERIALIZE(lockup_list,(user)(initial_amount)(lockup_period)(start_time))
         };
      
         //@abi table pubtbl i64
         struct pub_table {
            account_name user;
            account_name eos_account;
            asset balance;
	    	asset ink;	         
            
            uint64_t primary_key()const {return user;}
            EOSLIB_SERIALIZE(pub_table,(user)(eos_account)(balance)(ink))
         };
	      //@abi table staketbl2 i64
	      struct stake_table {
			account_name user;
            bool user_internal;
		    account_name owner;
            bool owner_internal;
		    asset balance;
		    uint32_t staked_at;
		   
		    uint64_t primary_key()const {return user;}
		    EOSLIB_SERIALIZE(stake_table,(user)(user_internal)(owner)(owner_internal)(balance)(staked_at))
	      }; 
	   
	      //@abi table unstaketbl i64
	      struct unstake_table {
		    account_name user;
            bool user_internal;
            account_name from;
            bool from_internal;
		    asset balance;
		    uint32_t unstaked_at;
		   
		    uint64_t primary_key()const {return user;}
		    EOSLIB_SERIALIZE(unstake_table,(user)(user_internal)(from)(from_internal)(balance)(unstaked_at))
	      }; 
            

         typedef eosio::multi_index<N(accounts), account> accounts;
         typedef eosio::multi_index<N(stat), currency_stat> stat;
         typedef eosio::multi_index<N(locktbl2), lockup_list> locktbl2;
      
         typedef eosio::multi_index<N(pubtbl), pub_table> pubtbl;
	     typedef eosio::multi_index<N(staketbl2), stake_table> staketbl2;
	     typedef eosio::multi_index<N(unstaketbl), unstake_table> unstaketbl;

         void sub_balance( account_name owner, asset value );
         void add_balance( account_name owner, asset value, account_name ram_payer );
	   
	   	 //@abi action
         void save(account_name user, asset quantity);
		 //@abi action
         void draw(account_name user, asset quantity);
	    //@abi action


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
