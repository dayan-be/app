import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
    FlatList,
    Animated,
} from 'react-native';

import MomentItem from './Item';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class MomentList extends React.Component{
    state = {
        list: [],
        isLoading: false, //上拉加载
        isRefreshing: false, //下拉刷新
    }

    componentDidMount() {
		this._fetchDataWithLoading();
	}
	
	componentWillUnmount() {
	
    }

    _fetchDataWithLoading = () => {
		this.setState({
			isLoading: true
		});
		setTimeout(() => {
			this.setState({
				isLoading: false
			})
		}, 1e4);
        
        this.setState({
            list: [{
                key: '1',
                user: '隔壁老王',
                avatar: 'https://avatar-cdn.shimo.im/VumBRouuhlcOAxeM/image.jpg!avatar',
                content: '哪天不在家，我准备去你家找你老婆',
                image: 'https://b-ssl.duitang.com/uploads/item/201503/14/20150314212812_kCLmy.jpeg',
            },{
                key: '2',
                user: '隔壁老王',
                avatar: 'https://avatar-cdn.shimo.im/VumBRouuhlcOAxeM/image.jpg!avatar',
                content: '哪天不在家，我准备去你家找你老婆',
                image: 'https://b-ssl.duitang.com/uploads/item/201503/14/20150314212812_kCLmy.jpeg',
            },{
                key: '3',
                user: '隔壁老王',
                avatar: 'https://avatar-cdn.shimo.im/VumBRouuhlcOAxeM/image.jpg!avatar',
                content: '哪天不在家，我准备去你家找你老婆',
                image: 'https://b-ssl.duitang.com/uploads/item/201503/14/20150314212812_kCLmy.jpeg',
            },{
                key: '4',
                user: '隔壁老王',
                avatar: 'https://avatar-cdn.shimo.im/VumBRouuhlcOAxeM/image.jpg!avatar',
                content: '哪天不在家，我准备去你家找你老婆',
                image: 'https://b-ssl.duitang.com/uploads/item/201503/14/20150314212812_kCLmy.jpeg',
            },{
                key: '5',
                user: '隔壁老王',
                avatar: 'https://avatar-cdn.shimo.im/VumBRouuhlcOAxeM/image.jpg!avatar',
                content: '哪天不在家，我准备去你家找你老婆',
                image: 'https://b-ssl.duitang.com/uploads/item/201503/14/20150314212812_kCLmy.jpeg',
            },{
                key: '6',
                user: '隔壁老王',
                avatar: 'https://avatar-cdn.shimo.im/VumBRouuhlcOAxeM/image.jpg!avatar',
                content: '哪天不在家，我准备去你家找你老婆',
                image: 'https://b-ssl.duitang.com/uploads/item/201503/14/20150314212812_kCLmy.jpeg',
            },]
        });
		
    }

    _renderRows = ({item, index}) => {
		return (
			<MomentItem
				{...this.props}
				item={item}
				index={index}
				// separators={separators}
				// onPress={(row, setItem) => {
				// 	navigate.push(DynamicDetail, {
				// 		item: row,
				// 		setItem,
				// 		removeDynamic: this.removeDynamic,
				// 		deleteRow: this.deleteRow,
				// 		onShield: this.onShield,
				// 		index: index
				// 	})
				// }}
			/>
		)
	};
    
    render() {
        return <AnimatedFlatList
            data={this.state.list}
            extraData={this.state}
            renderItem={this._renderRows}
            // initialNumToRender={config.pageSize}
            // keyExtractor={(item, index) => index.toString()}
            // ItemSeparatorComponent={this._itemSeparator}
            // ListEmptyComponent={}
            // onEndReached={this._fetchMoreData}
            // onEndReachedThreshold={0.3}
            // onRefresh={this._fetchDataWithRefreshing}
            // refreshing={this.state.isRefreshing}
            // ListFooterComponent={this._renderFooter}
            // onViewableItemsChanged={this._onViewableItemsChanged}
            onScroll={this.props.scrollListener}
            {...this.props}
            />
    }
};
