import '../index.scss';
import down from '../../../assets/image/farm/down.svg'
import { Button, Skeleton, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { getTokenByName } from '../../Dex/components/list';
import { calcHours, findAddressByName, findNameByAddress, formatTime, fromUnit, numFormat, showLogin } from '../../../lib/util';
import Activenumber from '../../../components/common/Activenumber';
import store from '../../../store';
import { getAddress } from '../../../contract';
import { intervalUnit, timeUnit } from '../../../global';
import { QuestionCircleOutlined } from '@ant-design/icons';
  import share from '../../../assets/image/farm/share.svg'
  import { useTranslation } from 'react-i18next';
import { ClaimTips } from '../../../contract/farmlist';
import { getNetwork } from '../../../contracts';
const decimal = 6
const FarmSquareItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let { t, i18n } = useTranslation()
  let lastTime
  return (
    <div className="farm-square-item m-b-100">
      <div className="p-30">
        {/* logl&info  start*/}
        <div className="flex flex-between flex-center">
          <div className="logo">
            {
              findNameByAddress(props.info.depositToken).includes('-') ? (
                <>
                  <img src={getTokenByName(findNameByAddress(props.info.depositToken)?.split('-')[0]).icon} alt="" className='main-logo' />
                  <img src={getTokenByName(findNameByAddress(props.info.depositToken)?.split('-')[1]).icon} alt="" className='sub-logo' />
                </>

              ):(
                <img src={getTokenByName(findNameByAddress(props.info.depositToken)).icon} alt="" className='single-logo' />
              )
            }
            
          </div>
          <div className="fz-24 fwb flex flex-column flex-end flex-middle">
            <span>
            {
                findNameByAddress(props.info.depositToken).includes('-') ? (findNameByAddress(props.info.depositToken) + '（2Pool LP）') : (findNameByAddress(props.info.depositToken))
              }
            </span>
            <div className='w100 flex flex-between'>
            <a target="_blank" href={getNetwork().params.blockExplorerUrls[0]+'address/'+findAddressByName(props.info.name)} className="m-l-10 cy view-contract islink underline pointer fz-14">{t('View Contract')}
                 <img src={share} alt="" />
              </a>
            {
                props.flexibleType == 'flexible' ?
                <span className='tag-flexible m-l-8 lh-26 bdr-13 p-l-19 p-r-19'>{t('Flexible')}</span>:
                <span className='tag-fixed m-l-8 lh-26 bdr-13 p-l-19 p-r-19'>{t('Fixed')}</span>
              }
            </div>
              
          </div>
        </div>
        {/* logl&info end */}
        <div className="flex flex-center flex-between m-t-36">
          <span className="fz-14 c2b">{t('Total Staked')}</span>
          <span className="fz-16 c2b fwb">
          {typeof(props.info.totalDeposits) == 'undefined' ?<Skeleton.Button active size={'small'} />:<Activenumber value={fromUnit(props.info.totalDeposits) || '0'} decimals={4} />}
              &nbsp;
              {
                findNameByAddress(props.info.depositToken)}
            </span>
        </div>

        <div className="flex flex-center flex-between m-t-17">
          <span className="fz-14 c2b">{props.flexibleType == 'fixed' && t('MAX') } APY</span>
          <span className="fz-16 c2b fwb ce1">{typeof(props.info.apr) == 'undefined' ?<Skeleton.Button active size={'small'} />:(<><Activenumber value={props.info.apr} decimals={2}/>%</>)}</span>
        </div>

        <div className="flex flex-between m-t-36 flex-end">
          <div className="flex flex-column flex-start">
            <span className="fz-16 c2b">{findNameByAddress(props.info.rewardToken)} {t('Earned')}</span>
            <span className="fz-24 c2b fwb">
            {
                  typeof(props.info.depositions?.reward) == 'undefined' ?<Skeleton.Button active size={'small'} />:<Activenumber value={fromUnit(props.info.depositions?.reward)} decimals={4} /> 
                }&nbsp;
               {findNameByAddress(props.info.rewardToken)}</span>
          </div>
          {
                props.account && (props.flexibleType == 'flexible' && !props.info.name.split('->')[0].includes('-') ?
                  <Button className={"color m-b-6 farm-btn"} loading={props.claimLoading} onClick={props.showReward}>{t('Reward')}</Button> :
                   <span className="flex flex-column">
                    {
                      props.flexibleType == 'fixed'?<Button className={"color m-b-6 farm-btn"} disabled={props.info.depositions?.amount <=0} loading={props.claimLoading} onClick={props.showDetail}>{t('Stake Detail')}</Button>:
                      <Button className={"color m-b-6 farm-btn"} disabled={lastTime || props.info.pending_reward <=0} loading={props.claimLoading} onClick={props.toClaim}>{t('Claim')}</Button>
                    }
                   </span>
                  )
              }
          
        </div>
        {/* <div className="flex m-t-36">
          <span className="c2b fz-14">{t('Stake')} {
                findNameByAddress(props.info.depositToken)}</span>
          <span className='fz-14 ce1 m-l-5'>
          {t('Get')} {
                findNameByAddress(props.info.depositToken)}
          </span>
        </div> */}
        {
          props.flexibleType == 'flexible' && <div className="w100 flex flex-center  m-t-16">
          {props.account ? <Button className="flex-1 color farm-btn" onClick={props.showStake}>{t('Stake')}</Button>:<Button className="flex-1 color farm-btn" onClick={showLogin}>{t('Connect Wallet')}</Button>}
          {
            props.info.depositions?.amount > 0 && props.flexibleType == 'flexible' && <Button className='unstake-btn supply-btn flex-1 fwb cy fz-14 fwb m-l-14 ta hover' onClick={props.showUnStake}> <span className="cy">{t('UnStake')}</span> </Button>
          }
        </div>
        }
        {
          props.flexibleType == 'fixed' && <div className="w100 flex flex-center  m-t-16">
             {props.account ? <Button className="flex-1 color farm-btn" onClick={props.showStake}>{t('Fixed Stake')}</Button>:<Button className="flex-1 color farm-btn" onClick={showLogin}>{t('Connect Wallet')}</Button>}
        </div>
        }
        
        
      </div>

      <div className="hr-line"></div>
      <div className="flex flex-center flex-middle ce1 fz-16 p-t-32 p-b-32 pointer" onClick={() => {
        setIsOpen(!isOpen)
      }}>
        {t('Detail')}
        <img src={down} alt="" className={'m-l-4 ' + (isOpen ? 'rotate' : '')} />
      </div>
      <div className={"detail p-l-30 p-r-30 " + (isOpen ? 'show-detail  p-b-30' : 'hide-detail')}>
        <div className="flex flex-between">
          <span className='fz-14 c2b'>{t('My position')}</span>
          <span className="fz-16 c2b fwb">
          {typeof(props.info.depositions?.amount) == 'undefined' ?<Skeleton.Button active size={'small'} />:(<><Activenumber value={fromUnit(props.info.depositions?.amount)} decimals={4}/></>)}
              &nbsp;
              {
                findNameByAddress(props.info.depositToken)}</span>
        </div>
        <div className="flex flex-between m-t-25">
          <span className='fz-14 c2b'>{t('Earn')}</span>
          <span className="fz-16 c2b fwb">{findNameByAddress(props.info.rewardToken)}</span>
        </div>

        <div className="flex flex-between m-t-25">
          <span className='fz-14 c2b'>{t('Weekly Reward')}</span>
          <span className="fz-16 c2b fwb">{
                typeof(props.info.weeklyReward) == 'undefined' ?<Skeleton.Button active size={'small'} />:
                (numFormat(fromUnit(props.info.weeklyReward) || '0'))
                // <Activenumber value={fromUnit(props.info.weeklyReward) || '0'} decimals={0}/>
            }</span>
        </div>
        

      </div>
    </div>
  )
}

export default FarmSquareItem