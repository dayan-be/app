import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { WebBrowser } from 'expo';

// import { withCollapsible } from 'react-navigation-collapsible';
import { withCollapsible } from '../components/collapsible';

import { MonoText } from '../components/StyledText';

import TabBar from '../components/tab/TabBar'
import styleUtil from '../common/styleUtil';
import MomentList from '../components/moment/List';

const AnimatedMomentList = Animated.createAnimatedComponent(MomentList);

const AnimatedScrollableTabView = Animated.createAnimatedComponent(ScrollableTabView);

class HomeBaseScreen extends React.Component {
  static navigationOptions = {
    title: '大雁当家',
    headerStyle: {
      borderBottomWidth: 0,
    },
  };

  constructor(props){
    super(props);

    const tabs = [
      {name: '生活圈', uri: ''},
			{name: '推荐', uri: ''},
			{name: '小区公告', uri: ''},
    ];

    this.state = {
      tabs,
			activeIndex: 0,
			fromIndex:0
    };

    this.state.scrollY = new Animated.Value(0);    
  }

  renderItem = ({item}) => (
    <Text style={{fontSize: 22}}>{item}</Text>
  )

  renderTabBar = props => {
    return (<TabBar
      backgroundColor={null}
      activeTextColor={styleUtil.activeTextColor}
      activeTextStyle={{
        fontSize: 24,
        lineHeight: 33,
      }}
      fromIndex={this.state.fromIndex}
      inactiveTextColor={styleUtil.inactiveTextColor}
      tabUnderlineDefaultWidth={8}
      underlineStyle={styleUtil.underlineStyle}
      tabContainerWidth={280}
      textStyle={{
        fontSize: 15,
        lineHeight: 21,
      }}
      style={{
        width: 280,
        paddingTop:20,
        borderBottomWidth:0
      }}
      {...props}
      tabs={this.state.tabs}
    />);
  }

  onChangeTab = ({i, ref, from}) => {
		if (this.state.activeIndex !== i) {
			this.setState({
				activeIndex: i,
				fromIndex:from
			});
		}
  }

  render() {
    const { paddingHeight, scrollY, onScroll } = this.props.collapsible;
    console.log(scrollY, '=====');
    return (
      <Animated.View 
      _mustAddThis={scrollY}
      style={[styles.container, {paddingTop: paddingHeight}]}>
        <ScrollableTabView
          style={[styles.tabView,]}
          // contentContainerStyle={{marginTop: paddingHeight}}
          // scrollIndicatorInsets={{top: paddingHeight}}
          _mustAddThis={scrollY}
          tabBarPosition={'top'}
          renderTabBar={this.renderTabBar}
          onChangeTab={this.onChangeTab}
          initialPage={0}
        >
          {this.state.tabs.map((v, i) => {
            return (<AnimatedMomentList
              key={v.name}
              {...this.props}
              tabLabel={v.name}
              onScroll={onScroll}
            ></AnimatedMomentList>)
          })}
        </ScrollableTabView>
      </Animated.View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const ExtraHeader = ({navigation}) => {  
  const { searchText } = navigation.state.params ? navigation.state.params : {};
  const iconSize = 40;
  const iconTintColor = '#eee';

  const actions = [{
    key: '1',
    icon: require('../assets/images/ywh.png'),
    text: '业委会',
  }, {
    key: '2',
    icon: require('../assets/images/jf.png'),
    text: '缴费',
  }, {
    key: '3',
    icon: require('../assets/images/wx.png'),
    text: '维修',
  },];


  return (
    <View style={{alignItems: 'center', width: '100%', height: '100%', paddingHorizontal: 15, justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
      {
        actions.map(item => {
          return (<View 
            key={item.key}
            style={{backgroundColor: 'white', flex: 1, borderRadius: 10, margin: 10, justifyContent: 'center', width: 40,}}>
              <Image
                style={{margin: 'auto', width: iconSize, height: iconSize, justifyContent: 'center', alignItems: 'center'}}
                source={ item.icon}
              />
              <Text style={{marginTop: 4, fontSize: 12, justifyContent: 'center', alignItems: 'center'}}>{item.text}</Text>
            </View>)
        })
      }
    </View>
  );
}

const collapsibleParams = {
  extraHeader: ExtraHeader,
  extraHeaderStyle: {
    height: 60, 
    width: '100%',
    backgroundColor: 'white'
  }
}

export default withCollapsible(HomeBaseScreen, collapsibleParams);
// export default HomeBaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
  },
  tabView: {
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
