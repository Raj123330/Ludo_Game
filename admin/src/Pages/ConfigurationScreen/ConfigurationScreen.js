import ConfigWithdrawReward from '../../component/Configuration/Configcomponent/Configcard23';
import ConfigSupportFast from '../../component/Configuration/Configcomponent/Configcard45';
import SuperAdminConfig from '../../component/Configuration/Configcomponent/SuperAdmin';
import './ConfigurationScreen.css';

function ConfigurationScreen() {
  return (
      <div className="layout">
          <div className="column m">
              <SuperAdminConfig/>
              <ConfigWithdrawReward/>
              <ConfigSupportFast />
          </div>
      </div>
  );
}

export default ConfigurationScreen;
