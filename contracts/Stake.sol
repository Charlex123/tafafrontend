// SPDX-License-Identifier: MIT

pragma solidity^0.8.9;

import "./TAFA.sol";
import "./SafeMath.sol";

contract Stake{
    using SafeMath for uint256;
    address staker = msg.sender;
    address stakedeployer;
    uint timeNow = block.timestamp;
    TAFA public tokenContract;
    
    constructor(TAFA _tokenContract) {
        tokenContract = _tokenContract;
        stakedeployer = msg.sender; 
    }

    struct Users {
        bool hasStake;
        uint stakeCount;
        bool unStaked;
        uint refCount;
        bool wasReferred;
        mapping(address => Stakes) userStakes;
        mapping(address => Referrals) userReferrals;
    }

    struct Stakes {
        uint stakeId;
        uint rewardTime;
        uint stakeDuration;
        uint stakeAmount;
        uint currentstakeReward;
        uint stakeRewardPerDay;
        uint totalstakeReward;
        uint totalReward;
        uint Stakes;
        bool isActive; 
        address stakerAddress;
    }

    struct Referrals {
        address referral;
        address referredby;
        address[] allreferrals;
        address[] firstgenReferrals;
        address[] secondgenReferrals;
        address[] thirdgenReferrals;
    }

    mapping(address => uint256) private _balanceOf;
    mapping(address => Users) private userDetails;
    mapping(address => Referrals) private referrals;
    address[] public userAddresses;
    address[] private downlines;

    event StakedEvent(address indexed staker, uint stake_duration, uint stake_amount, uint stakerewardperDay, uint totalstakeReward, uint total_reward, bool isActive, bool hasStake);
    event WithdrawlEvent(address indexed Withdrawer, uint total_Reward, uint WithdrawTime);
    event AddReferral(address indexed referral, address indexed sponsor);

    function hasStaked(address _staker) public view returns(bool) {
        if(userDetails[_staker].hasStake == true) return true;
        return false;
    }

    function wasRef_errered(address _staker) public view returns(bool) {
        if(userDetails[_staker].wasReferred == true) return true;
        return false;
    }

    function myWalletAddress() public view returns(address) {
        return msg.sender;
    }

    function getOwner() public view returns(address) {
        return stakedeployer;
    }
   
    function myTokenBalance() public view returns(uint) {
        return _balanceOf[msg.sender];
    }
    
    function addReferrer(address _sponsor) public {
        require(_sponsor != address(0), "Sponsor cannot be a zero address");
        require(_sponsor != msg.sender, "You cannot refer yourself");
        // add referrer to sponsor first generation referrals
        userDetails[_sponsor].userReferrals[_sponsor].referral = msg.sender;
        userDetails[msg.sender].userReferrals[msg.sender].referredby = _sponsor;
        userDetails[msg.sender].wasReferred = true;
        userDetails[_sponsor].userReferrals[_sponsor].firstgenReferrals.push(msg.sender);
        userAddresses.push(msg.sender);
        userDetails[_sponsor].userReferrals[_sponsor].allreferrals.push(msg.sender);
        // check if sponsor has upline
        if(userDetails[_sponsor].wasReferred == true ) {
            address sponsorupline = userDetails[_sponsor].userReferrals[_sponsor].referredby;
            // add referral to sponsorupline second generation referrals
            userDetails[sponsorupline].userReferrals[sponsorupline].secondgenReferrals.push(msg.sender);
            if(userDetails[sponsorupline].wasReferred == true) {
                address sponsorsponsorupline = userDetails[sponsorupline].userReferrals[sponsorupline].referredby;
                // add sponsorupline third generation referrals
                userDetails[sponsorsponsorupline].userReferrals[sponsorsponsorupline].thirdgenReferrals.push(msg.sender);
            }else {

            }
        }

        userDetails[_sponsor].refCount++;
        emit AddReferral(msg.sender,_sponsor);
    }

    function getRefCount() public view returns (uint refcount) {
        require(msg.sender != address(0),"Zero addresses are not accepted");

        return userDetails[msg.sender].userReferrals[msg.sender].allreferrals.length;
    }

    function getReferrals() public view returns (address[] memory userdownlines) {
        require(msg.sender != address(0),"Zero addresses are not accepted");
        return userDetails[msg.sender].userReferrals[msg.sender].allreferrals;
    } 

    function stake(uint stake_amount, uint stake_duration) public payable returns(uint count) {
        // require(_balanceOf[staker] >= stake_amount, "staker must have enough tokens to stake");
        require(staker != address(0), "Staker cannot be a zero address");

        if(stake_duration == 30 || stake_duration == 90 || stake_duration == 365 || stake_duration == 1000) {
        
        uint interest_RatePerDay;

        if(stake_duration == 30) {
            interest_RatePerDay = stake_amount.mul(2).div(100);
        }
        else if(stake_duration == 90) {
            interest_RatePerDay = stake_amount.mul(22).div(1000);
        }
        else if(stake_duration == 365) {
            interest_RatePerDay = stake_amount.mul(3).div(100);
        }
        else if(stake_duration == 1000) {
            interest_RatePerDay = stake_amount.mul(35).div(1000);
        }

        userDetails[staker].stakeCount++;
        userDetails[staker].userStakes[staker].stakeId++;
        userDetails[staker].userStakes[staker].rewardTime = timeNow + stake_duration * 1 days;
        userDetails[staker].userStakes[staker].stakeDuration = stake_duration;
        userDetails[staker].userStakes[staker].stakeRewardPerDay = interest_RatePerDay;
        userDetails[staker].userStakes[staker].totalstakeReward = interest_RatePerDay.mul(stake_duration);
        userDetails[staker].userStakes[staker].totalReward = stake_amount.add(userDetails[staker].userStakes[staker].totalstakeReward);
        userDetails[staker].userStakes[staker].stakeAmount = stake_amount;
        userDetails[staker].hasStake = true;
        userDetails[staker].userStakes[staker].isActive = true;

        }else {
            revert("invalid stake period");
        }

        uint stakerewardperDay = userDetails[staker].userStakes[staker].stakeRewardPerDay;
        uint total_reward = userDetails[staker].userStakes[staker].totalReward;
        uint totalstake_reward = userDetails[staker].userStakes[staker].totalstakeReward;
        userDetails[staker].stakeCount++;

        // transfer tokens to contract
        tokenContract.transferFrom(msg.sender, address(this), stake_amount);
        // updateusertokenbalance
        _balanceOf[msg.sender] += stake_amount;
        
        emit StakedEvent(staker, stake_duration, stake_amount, stakerewardperDay, totalstake_reward, total_reward, true, true);
        return (userAddresses.length) -1;
    }

    function getuserCount() public view returns (uint) {
        return userAddresses.length;
    }

    function calcReward() public view returns (uint totaluserreward_) {
        require(msg.sender != address(0),"Zero addresses are not accepted");
        require(hasStaked(msg.sender) != false, "No active stake found");
        // get user stake duration 
        uint userstakereward = userDetails[msg.sender].userStakes[staker].totalReward;
        uint totaluserreward;
        // check if user has referrals
        if(userDetails[msg.sender].userReferrals[msg.sender].allreferrals.length > 0) {
            // get sum of ref bonuses
            uint totalfirstgenrefbonus = 0;
            uint totalsecondgenrefbonus = 0;
            uint totalthirdgenrefbonus = 0;

            if(userDetails[msg.sender].userReferrals[msg.sender].firstgenReferrals.length > 0) {
            // check for first level generation referrals
                for(uint8 i = 0; i <= userDetails[msg.sender].userReferrals[msg.sender].firstgenReferrals.length; i++) {
                    address firstgenref = userDetails[msg.sender].userReferrals[msg.sender].firstgenReferrals[i];
                    // check if referral has active stake
                    if(userDetails[firstgenref].hasStake == true) {
                        // get referral stake amount
                        uint256 firstgenrefstakeAmt = userDetails[firstgenref].userStakes[staker].stakeAmount;
                        uint firstgenrefbonus = firstgenrefstakeAmt.mul(5).div(100);
                        totalfirstgenrefbonus += firstgenrefbonus;
                    }
                }
            }
            if(userDetails[msg.sender].userReferrals[msg.sender].secondgenReferrals.length > 0) {
            // check for first level generation referrals
                for(uint8 i = 0; i <= userDetails[msg.sender].userReferrals[msg.sender].secondgenReferrals.length; i++) {
                    address secondgenref = userDetails[msg.sender].userReferrals[msg.sender].secondgenReferrals[i];
                    // check if referral has active stake
                    if(userDetails[secondgenref].hasStake == true) {
                        // get referral stake amount
                        uint256 secondgenrefstakeAmt = userDetails[secondgenref].userStakes[staker].stakeAmount;
                        uint secondgenrefbonus = secondgenrefstakeAmt.mul(5).div(100);
                        totalsecondgenrefbonus += secondgenrefbonus;
                    }
                }
            }
            if(userDetails[msg.sender].userReferrals[msg.sender].thirdgenReferrals.length > 0) {
            // check for first level generation referrals
                for(uint8 i = 0; i <= userDetails[msg.sender].userReferrals[msg.sender].thirdgenReferrals.length; i++) {
                    address thirdgenref = userDetails[msg.sender].userReferrals[msg.sender].thirdgenReferrals[i];
                    // check if referral has active stake
                    if(userDetails[thirdgenref].hasStake == true) {
                        // get referral stake amount
                        uint256 thirdgenrefstakeAmt = userDetails[thirdgenref].userStakes[staker].stakeAmount;
                        uint thirdgenrefbonus = thirdgenrefstakeAmt.mul(5).div(100);
                        totalthirdgenrefbonus += thirdgenrefbonus;
                    }
                }
            }
        totaluserreward = userstakereward.add(totalfirstgenrefbonus).add(totalsecondgenrefbonus).add(totalthirdgenrefbonus);
        totaluserreward_ = totaluserreward;
        return totaluserreward_;
        }
    }

    function withdrawStake() public payable returns(bool) {
        require(hasStaked(staker) != false,"You must have stake to withdraw");
        if(timeNow >= userDetails[staker].userStakes[staker].rewardTime) {
            uint userstakereward = userDetails[staker].userStakes[staker].totalReward;
            uint WithdrawTime = timeNow;
            address Withdrawer = staker;
            
            uint totaluserreward;
            // check if user has referrals
            if(userDetails[msg.sender].userReferrals[msg.sender].allreferrals.length > 0) {
                uint totalfirstgenrefbonus = 0;
                uint totalsecondgenrefbonus = 0;
                uint totalthirdgenrefbonus = 0;

                if(userDetails[staker].userReferrals[staker].firstgenReferrals.length > 0) {
                // check for first level generation referrals
                    for(uint8 i = 0; i <= userDetails[staker].userReferrals[staker].firstgenReferrals.length; i++) {
                        address firstgenref = userDetails[staker].userReferrals[staker].firstgenReferrals[i];
                        // check if referral has active stake
                        if(userDetails[firstgenref].hasStake == true) {
                            // get referral stake amount
                            uint256 firstgenrefstakeAmt = userDetails[firstgenref].userStakes[staker].stakeAmount;
                            uint firstgenrefbonus = firstgenrefstakeAmt.mul(5).div(100);
                            totalfirstgenrefbonus += firstgenrefbonus;
                        }
                    }
                }
                if(userDetails[staker].userReferrals[staker].secondgenReferrals.length > 0) {
                // check for first level generation referrals
                    for(uint8 i = 0; i <= userDetails[staker].userReferrals[staker].secondgenReferrals.length; i++) {
                        address secondgenref = userDetails[staker].userReferrals[staker].secondgenReferrals[i];
                        // check if referral has active stake
                        if(userDetails[secondgenref].hasStake == true) {
                            // get referral stake amount
                            uint256 secondgenrefstakeAmt = userDetails[secondgenref].userStakes[staker].stakeAmount;
                            uint secondgenrefbonus = secondgenrefstakeAmt.mul(5).div(100);
                            totalsecondgenrefbonus += secondgenrefbonus;
                        }
                    }
                }
                if(userDetails[staker].userReferrals[staker].thirdgenReferrals.length > 0) {
                // check for first level generation referrals
                    for(uint8 i = 0; i <= userDetails[staker].userReferrals[staker].thirdgenReferrals.length; i++) {
                        address thirdgenref = userDetails[staker].userReferrals[staker].thirdgenReferrals[i];
                        // check if referral has active stake
                        if(userDetails[thirdgenref].hasStake == true) {
                            // get referral stake amount
                            uint256 thirdgenrefstakeAmt = userDetails[thirdgenref].userStakes[staker].stakeAmount;
                            uint thirdgenrefbonus = thirdgenrefstakeAmt.mul(5).div(100);
                            totalthirdgenrefbonus += thirdgenrefbonus;
                        }
                    }
                }
            totaluserreward = userstakereward.add(totalfirstgenrefbonus).add(totalsecondgenrefbonus).add(totalthirdgenrefbonus);
            
            }else {
                totaluserreward = userstakereward;
            }

            userDetails[staker].stakeCount--;
            userDetails[staker].userStakes[staker].Stakes--;
            userDetails[staker].userStakes[staker].isActive = false;
            tokenContract.transfer(staker, totaluserreward);

            // update userBalance
            _balanceOf[msg.sender] -= totaluserreward;

            // if();
            
            emit WithdrawlEvent(Withdrawer, totaluserreward, WithdrawTime);
            return true;
        }else {
            uint userstakereward = userDetails[staker].userStakes[staker].totalReward;
            uint WithdrawTime = timeNow;
            address Withdrawer = staker;
            
            uint totaluserreward;
            // check if user has referrals
            if(userDetails[msg.sender].userReferrals[msg.sender].allreferrals.length > 0) {
                uint totalfirstgenrefbonus = 0;
                uint totalsecondgenrefbonus = 0;
                uint totalthirdgenrefbonus = 0;

                if(userDetails[staker].userReferrals[staker].firstgenReferrals.length > 0) {
                // check for first level generation referrals
                    for(uint8 i = 0; i <= userDetails[staker].userReferrals[staker].firstgenReferrals.length; i++) {
                        address firstgenref = userDetails[staker].userReferrals[staker].firstgenReferrals[i];
                        // check if referral has active stake
                        if(userDetails[firstgenref].hasStake == true) {
                            // get referral stake amount
                            uint256 firstgenrefstakeAmt = userDetails[firstgenref].userStakes[staker].stakeAmount;
                            uint firstgenrefbonus = firstgenrefstakeAmt.mul(5).div(100);
                            totalfirstgenrefbonus += firstgenrefbonus;
                        }
                    }
                }
                if(userDetails[staker].userReferrals[staker].secondgenReferrals.length > 0) {
                // check for first level generation referrals
                    for(uint8 i = 0; i <= userDetails[staker].userReferrals[staker].secondgenReferrals.length; i++) {
                        address secondgenref = userDetails[staker].userReferrals[staker].secondgenReferrals[i];
                        // check if referral has active stake
                        if(userDetails[secondgenref].hasStake == true) {
                            // get referral stake amount
                            uint256 secondgenrefstakeAmt = userDetails[secondgenref].userStakes[staker].stakeAmount;
                            uint secondgenrefbonus = secondgenrefstakeAmt.mul(5).div(100);
                            totalsecondgenrefbonus += secondgenrefbonus;
                        }
                    }
                }
                if(userDetails[staker].userReferrals[staker].thirdgenReferrals.length > 0) {
                // check for first level generation referrals
                    for(uint8 i = 0; i <= userDetails[staker].userReferrals[staker].thirdgenReferrals.length; i++) {
                        address thirdgenref = userDetails[staker].userReferrals[staker].thirdgenReferrals[i];
                        // check if referral has active stake
                        if(userDetails[thirdgenref].hasStake == true) {
                            // get referral stake amount
                            uint256 thirdgenrefstakeAmt = userDetails[thirdgenref].userStakes[staker].stakeAmount;
                            uint thirdgenrefbonus = thirdgenrefstakeAmt.mul(5).div(100);
                            totalthirdgenrefbonus += thirdgenrefbonus;
                        }
                    }
                }
            totaluserreward = userstakereward.add(totalfirstgenrefbonus).add(totalsecondgenrefbonus).add(totalthirdgenrefbonus);
            
            }else {
                totaluserreward = userstakereward;
            }

            uint twentyfivepercentwithdrawal = totaluserreward.mul(25).div(100);
            uint withdrawamount = totaluserreward.sub(twentyfivepercentwithdrawal);
            userDetails[staker].stakeCount--;
            userDetails[staker].userStakes[staker].Stakes--;
            userDetails[staker].userStakes[staker].isActive = false;
            tokenContract.transfer(staker, withdrawamount);

            // update userBalance
            _balanceOf[msg.sender] -= totaluserreward;

            // if();
            
            emit WithdrawlEvent(Withdrawer, totaluserreward, WithdrawTime);
            return true;
        }
        
    }

}