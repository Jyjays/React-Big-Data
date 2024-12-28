import React, { PureComponent } from 'react';
import { CenterPage, CenterBottom, CenterTop } from './style';
import { connect } from 'dva';
import { BorderBox13 } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '../../style/globalStyledSet';
import XuzhouMap from './charts/Map';
import Modal from 'react-modal';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      etcData: [], // Store fetched data
      isTopModalOpen: false,
      isTBottomModalOpen: false,
    };
    this.scrollRef = React.createRef(); // Reference to the scrolling container
  }

  componentDidMount() {
    // Initial fetch
    this.fetchData();

    // Set up interval to fetch data every minute
    this.fetchInterval = setInterval(this.fetchData, 1000);

    // Start scrolling
    this.startScrolling();
  }

  componentWillUnmount() {
    // Clear intervals when the component unmounts
    clearInterval(this.scrollInterval);
    clearInterval(this.fetchInterval);
  }

  fetchData = () => {
    fetch('http://120.46.31.49:8080/etc/selectIncrementEtc')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ etcData: data });
      })
      .catch((error) => console.error('Failed to fetch data:', error));
  };

  startScrolling = () => {
    const scrollContainer = this.scrollRef.current;
    if (!scrollContainer) return;

    // Reset scroll position to the top if reached the bottom
    const scrollStep = () => {
      scrollContainer.scrollTop += 1; // Scroll step
    };

    this.scrollInterval = setInterval(scrollStep, 50); // Adjust speed (50ms per step)
  };

  // Map hpzl and fxsj to a readable format
  mapPlateAndType = (hpzl) => {
    const vehicleTypes = ['一型车', '二型车', '三型车', '四型车', '五型车', '六型车'];
    const vehicleCategory = hpzl < 10 ? '客' : '货';
    const type = vehicleTypes[hpzl % 10 - 1] || '未知车型';
    return `${type}（${vehicleCategory}）`;
  };

  // Map license plate prefix to a region/person description
  mapLicenseRegion = (license) => {
    const prefixMap = {
      // 北京
      京A: '北京人',
      京B: '北京人',
      京C: '北京人',
      京D: '北京人',
      京E: '北京人',
      京F: '北京人',

      // 天津
      津A: '天津人',
      津B: '天津人',
      津C: '天津人',
      津D: '天津人',

      // 河北
      冀A: '石家庄人',
      冀B: '唐山人',
      冀C: '秦皇岛人',
      冀D: '邯郸人',
      冀E: '邢台人',
      冀F: '保定人',
      冀G: '张家口人',
      冀H: '承德人',
      冀J: '沧州人',
      冀R: '廊坊人',
      冀T: '衡水人',

      // 山西
      晋A: '太原人',
      晋B: '大同人',
      晋C: '阳泉人',
      晋D: '长治人',
      晋E: '晋城人',
      晋F: '朔州人',
      晋H: '忻州人',
      晋J: '吕梁人',
      晋K: '晋中人',
      晋L: '临汾人',
      晋M: '运城人',

      // 内蒙古
      蒙A: '呼和浩特人',
      蒙B: '包头人',
      蒙C: '乌海人',
      蒙D: '赤峰人',
      蒙E: '通辽人',
      蒙F: '鄂尔多斯人',
      蒙G: '呼伦贝尔人',
      蒙H: '巴彦淖尔人',
      蒙J: '乌兰察布人',
      蒙K: '兴安盟人',
      蒙L: '锡林郭勒盟人',
      蒙M: '阿拉善盟人',

      // 辽宁
      辽A: '沈阳人',
      辽B: '大连人',
      辽C: '鞍山人',
      辽D: '抚顺人',
      辽E: '本溪人',
      辽F: '丹东人',
      辽G: '锦州人',
      辽H: '营口人',
      辽J: '阜新人',
      辽K: '辽阳人',
      辽L: '盘锦人',
      辽M: '铁岭人',
      辽N: '朝阳人',
      辽P: '葫芦岛人',

      // 吉林
      吉A: '长春人',
      吉B: '吉林人',
      吉C: '四平人',
      吉D: '辽源人',
      吉E: '通化人',
      吉F: '白山人',
      吉G: '松原人',
      吉H: '白城人',
      吉J: '延边人',

      // 黑龙江
      黑A: '哈尔滨人',
      黑B: '齐齐哈尔人',
      黑C: '牡丹江人',
      黑D: '佳木斯人',
      黑E: '大庆人',
      黑F: '伊春人',
      黑G: '鸡西人',
      黑H: '鹤岗人',
      黑J: '双鸭山人',
      黑K: '七台河人',
      黑L: '黑河人',
      黑M: '绥化人',
      黑N: '大兴安岭人',

      // 上海
      沪A: '上海人',
      沪B: '上海人',
      沪C: '上海人',
      沪D: '上海人',
      沪E: '上海人',
      沪F: '上海人',

      // 江苏
      苏A: '南京人',
      苏B: '无锡人',
      苏C: '徐州人',
      苏D: '常州人',
      苏E: '苏州人',
      苏F: '南通人',
      苏G: '连云港人',
      苏H: '淮安人',
      苏J: '盐城人',
      苏K: '扬州人',
      苏L: '镇江人',
      苏M: '泰州人',
      苏N: '宿迁人',

      // 浙江
      浙A: '杭州人',
      浙B: '宁波人',
      浙C: '温州人',
      浙D: '嘉兴人',
      浙E: '湖州人',
      浙F: '绍兴人',
      浙G: '金华人',
      浙H: '衢州人',
      浙J: '台州人',
      浙K: '丽水人',
      浙L: '舟山人',

      // 安徽
      皖A: '合肥人',
      皖B: '芜湖人',
      皖C: '蚌埠人',
      皖D: '淮南人',
      皖E: '马鞍山人',
      皖F: '淮北人',
      皖G: '铜陵人',
      皖H: '安庆人',
      皖J: '黄山人',
      皖K: '滁州人',
      皖L: '阜阳人',
      皖M: '宿州人',
      皖N: '六安人',
      皖P: '亳州人',
      皖Q: '池州人',
      皖R: '宣城人',

      // 福建
      闽A: '福州人',
      闽B: '莆田人',
      闽C: '泉州人',
      闽D: '厦门人',
      闽E: '漳州人',
      闽F: '龙岩人',
      闽G: '三明人',
      闽H: '南平人',
      闽J: '宁德人',

      // 江西
      赣A: '南昌人',
      赣B: '赣州人',
      赣C: '宜春人',
      赣D: '吉安人',
      赣E: '上饶人',
      赣F: '抚州人',
      赣G: '九江人',
      赣H: '景德镇人',
      赣J: '萍乡人',
      赣K: '新余人',
      赣L: '鹰潭人',

      // 广东
      粤A: '广州人',
      粤B: '深圳人',
      粤C: '珠海人',
      粤D: '汕头人',
      粤E: '佛山人',
      粤F: '韶关人',
      粤G: '湛江人',
      粤H: '肇庆人',
      粤J: '江门人',
      粤K: '茂名人',
      粤L: '惠州人',
      粤M: '梅州人',
      粤N: '汕尾人',
      粤P: '河源人',
      粤Q: '阳江人',
      粤R: '清远人',
      粤S: '东莞人',
      粤T: '中山人',
      粤U: '潮州人',
      粤V: '揭阳人',
      粤W: '云浮人',

      // 广西
      桂A: '南宁人',
      桂B: '柳州人',
      桂C: '桂林人',
      桂D: '梧州人',
      桂E: '北海人',
      桂F: '防城港人',
      桂G: '钦州人',
      桂H: '贵港人',
      桂J: '玉林人',
      桂K: '百色人',
      桂L: '贺州人',
      桂M: '河池人',
      桂N: '崇左人',
      桂P: '来宾人',

      // 海南
      琼A: '海口人',
      琼B: '三亚人',
      琼C: '洋浦人',
      琼D: '儋州人',

      // 香港
      港A: '香港人',

      // 澳门
      澳A: '澳门人',

      // 台湾
      台A: '台湾人',

      // 更多省份 (例如湖南、广东、广西等) 的格式类似。
    };

    const prefix = license.slice(0, 2);
    return prefixMap[prefix] || '其他地区人';
  };

  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { etcData, isTopModalOpen, isTBottomModalOpen } = this.state;
    const kkmc = [
      {
          "name": "徐州市邳州市S250宿邳线K1江苏徐州-S250-苏鲁界省际卡口",
          "lat": "34.344645",
          "lng": "118.019123"
      },
      {
          "name": "徐州市丰县鹿梁路K19丰县梁寨检查站市际卡口",
          "lat": "34.502240",
          "lng": "116.753934"
      },
      {
          "name": "徐州市邳州市S251枣睢线K5江苏徐州-S251-苏鲁界省际卡口",
          "lat": "34.644370",
          "lng": "117.995701"
      },
      {
          "name": "徐州市睢宁县S325淮宿线K63(325省道)63K+100M东侧-向西卡口市际卡口",
          "lat": "33.887963",
          "lng": "117.994846"
      },
      {
          "name": "G3京台高速K731江苏高速五大队江苏徐州-G3-苏鲁界省际卡口",
          "lat": "34.329557",
          "lng": "117.252869"
      },
      {
          "name": "徐州市铜山县G311徐州-西峡K207江苏徐州-G311-苏皖界省际卡口",
          "lat": "39.930808",
          "lng": "116.603973"
      },
      {
          "name": "徐州市铜山县G310连云港-天水K310江苏徐州-G310-苏皖界省际卡口",
          "lat": "34.186100",
          "lng": "117.175569"
      },
      {
          "name": "徐州市丰县G518518国道K358马楼公路站省际卡口",
          "lat": "34.874427",
          "lng": "116.560062"
      },
      {
          "name": "徐州市沛县S253郑沛龙线K0江苏徐州-S253-苏鲁界省际卡口",
          "lat": "34.765151",
          "lng": "116.942585"
      },
      {
          "name": "徐州市新沂市S323连徐线K10阿湖卡口-323省道连云港交界市际卡口",
          "lat": "34.380735",
          "lng": "118.611889"
      },
      {
          "name": "徐州市睢宁县G104北京-福州K873江苏徐州-G104-苏皖界省际卡口",
          "lat": "33.918789",
          "lng": "117.947432"
      },
      {
          "name": "徐州市铜山县G104北京-福州K744江苏徐州-G104-苏鲁界省际卡口",
          "lat": "34.186100",
          "lng": "117.175569"
      },
      {
          "name": "徐州市铜山县G206烟台-汕头K816江苏徐州-G206-苏皖界省际卡口",
          "lat": "39.896123",
          "lng": "116.294822"
      },
      {
          "name": "徐州市新沂市S505505省道K10新沂高速西出口-505省道宿迁界市际卡口",
          "lat": "34.369269",
          "lng": "118.355485"
      },
      {
          "name": "江苏省徐州市新沂市S323连徐线K96瓦窑检查站市际卡口",
          "lat": "39.646519",
          "lng": "116.733005"
      },
      {
          "name": "徐州市睢宁县S252塔双线K56江苏徐州-S252-苏皖界省际卡口",
          "lat": "34.041267",
          "lng": "117.596525"
      },
      {
          "name": "徐州市睢宁县S324燕沭睢线K201省道桑庄王马路路口西侧-向东卡口市际卡口",
          "lat": "39.930819",
          "lng": "116.604157"
      },
      {
          "name": "徐州市新沂市G235国道235K10江苏徐州-G235-交界市际卡口",
          "lat": "34.168416",
          "lng": "118.357664"
      },
      {
          "name": "徐州市丰县G237国道237线K148荣庄卡口省际卡口",
          "lat": "34.600993",
          "lng": "116.500217"
      }
  ];

    return (
      <CenterPage>
        <CenterTop>
        <BorderBox13 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#59255;</i>
                <span style={{ marginLeft: '250px' }}>收费站分布图</span>
              </ModuleTitle>
              <XuzhouMap kkmc={kkmc}/>
            </div>
          </BorderBox13>
        </CenterTop>
        <CenterBottom>
          <BorderBox13 className="center-bottom-borderBox13">
            <div className="center-bottom">
              <div className="detail-list">
                <ModuleTitle>
                  <i className="iconfont" style={{ marginLeft: '10px' }}>
                    &#59287;
                  </i>
                  <span style={{ marginLeft: '250px' }}>入站口情况</span>
                </ModuleTitle>
                <div className="detail-list-header">
                  <span>车牌号</span>
                  <span>车型</span>
                  <span>入站时间</span>
                  <span>入口名称</span>
                  <span>地区</span>
                  <span>备注</span>
                </div>
                <div className="detail-list-scroll" ref={this.scrollRef}>
                  {etcData && etcData.length > 0 ? (
                    etcData.map((item, index) => (
                      <div className="detail-list-item" key={index}>
                        <span>{item.hphm}</span>
                        <span>{this.mapPlateAndType(item.hpzl)}</span>
                        <span>{new Date(item.fxsj).toLocaleString()}</span>
                        <span>{item.kkmc}</span>
                        <span>{item.xzqhmc}</span>
                        <span>{this.mapLicenseRegion(item.hphm)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="detail-list-empty">暂无数据</div>
                  )}
                </div>
              </div>
            </div>
          </BorderBox13>
        </CenterBottom>
      </CenterPage>
    );
  }
}

export default connect()(Index);
