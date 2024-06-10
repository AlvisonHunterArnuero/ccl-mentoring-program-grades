import { ConfigProvider, Image } from 'antd';
import React from "react";
import FetchData from './components/FetchData'
import { headerLogoImgStyles, tagStyles, tblStyles } from './customStyles';

const App: React.FC = () => {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#003a8c',
        },
        components: {
          Table: tblStyles,
          Tag: tagStyles
        },
      }}
    >
      <div className="App">
        <Image
          style={headerLogoImgStyles}
          src="https://codecrafterslabs.com/assets/img/cll_horiz_logo.png"
        />
        <FetchData />
      </div>
    </ConfigProvider >
  );
};

export default App;