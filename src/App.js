import "antd/dist/antd.css";
import "./App.css";
import MainPageComponent from "./main";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./product";
import Navbar from "./Main component";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import  SliderMobile from "./antdMobile";
import 'antd-mobile/dist/antd-mobile.css';
function App() {
  const history = useHistory();
  return (
    <div>
      <Navbar />
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/ji/logo3.png" alt="" />
          </Link>
          {/* <Button
            size="large"
            onClick={function () {
              history.push("/upload");
            }}
            icon={<DownloadOutlined />}
          >
            상품 업로드
          </Button> */}
        </div>
      </div>
      <SliderMobile />
      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            <MainPageComponent />
          </Route>
          <Route exact={true} path="/products/:id">
            <ProductPage />
          </Route>
          <Route exact={true} path="/upload">
            <UploadPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;