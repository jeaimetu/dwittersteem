/**
 *  @file
 *  @copyright defined in LICENSE.txt
 */
#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <string>

namespace eosiosystem {
   class system_contract;
}

namespace eosio {

   using std::string;

   class token : public contract {
      public:
         using contract::contract;

         void create( name issuer,
                      asset        maximum_supply);
	 [[eosio::action]]  
	 void change( name issuer,
                      asset        maximum_supply);

         void issue( name to, asset quantity, string memo );

         void transfer( name from,
                        name to,
                        asset        quantity,
                        string       memo );
         [[eosio::action]]
         void lock(name user, uint32_t period, string memo);
         [[eosio::action]]
         void unlock(name user);
	 
	 [[eosio::action]]
	 void newaccount(name iuser);

	 [[eosio::action]]
	 void stake(name from, name to,asset quantity);	   
	 [[eosio::action]]
	 void unstake(name from, name to, asset quantity);
	 [[eosio::action]]
	 void refund(name from, name user);
	   
	 [[eosio::action]]
         void updatetp(name user, asset quantity);
	  
	 [[eosio::action]]
	 void prepare(name euser, name iuser, string memo);
	 [[eosio::action]]
	 void delaccount(name euser);
	 [[eosio::action]]
	 void check2(name euser, name iuser, string memo);
	   
	 [[eosio::action]]
	 void give(name from, name to, asset quantity, string event_case, string ttconid);
	 
      
         inline asset get_supply( symbol_code sym );
         
         inline asset get_balance( name owner, symbol_code sym );

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
      
         struct [[eosio::table]] lockup_list {
            name user;
            asset initial_amount;
            uint32_t lockup_period;
            uint32_t start_time;
            string memo;
            
            uint64_t primary_key()const {return user.value;}
            EOSLIB_SERIALIZE(lockup_list,(user)(initial_amount)(lockup_period)(start_time)(memo))
         };
	   
	 struct [[eosio::table]] map_table {
		 name euser;
		 name iuser;
		 
		 uint64_t primary_key()const {return euser.value;}
		 EOSLIB_SERIALIZE(map_table,(euser)(iuser))
	 };
	   
	 struct [[eosio::table]] took_table {
            name user;
            name eos_account;
            asset tookp_balance;
	    asset stake_sum;
	    asset air;	         
            uint64_t status;
            uint64_t primary_key()const {return user.value;}
            EOSLIB_SERIALIZE(took_table,(user)(eos_account)(tookp_balance)(stake_sum)(air)(status))
         };
	 struct [[eosio::table]] stake_table {
	    name user;
	    asset balance;
	    uint32_t staked_at;
		   
	    uint64_t primary_key()const {return user.value;}
	    EOSLIB_SERIALIZE(stake_table,(user)(balance)(staked_at))
	  }; 
	   
	  struct [[eosio::table]] unstake_table {
	    name user;
	    asset balance;
	    uint32_t unstaked_at;
		   
	    uint64_t primary_key()const {return user.value;}
	    EOSLIB_SERIALIZE(unstake_table,(user)(balance)(unstaked_at))
	  }; 
	 

         typedef eosio::multi_index< "accounts"_n, account> accounts;
         typedef eosio::multi_index< "stat"_n, currency_stat> stat;
         typedef eosio::multi_index< "locktbl2"_n, lockup_list> locktbl2;
	   
	 typedef eosio::multi_index< "tooktbl3"_n, took_table> tooktbl3;
	 typedef eosio::multi_index< "staketbl"_n, stake_table> staketbl;
	 typedef eosio::multi_index< "unstaketbl"_n, unstake_table> unstaketbl;
	 typedef eosio::multi_index< "maptbl"_n, map_table> maptbl;

         void sub_balance( name owner, asset value );
         void add_balance( name owner, asset value, name ram_payer );
	   
	 void sub_balance2( name owner, asset value );
         void add_balance2( name owner, asset value, name ram_payer );
	 void itransfer( name from, name to, asset quantity, string memo );
	 

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

   asset token::get_balance( name owner, symbol_code sym )
   {
      accounts accountstable( get_self(), owner.value );
      const auto& ac = accountstable.get( sym.raw() );
      return ac.balance;
   }

} ///namespace eosio
