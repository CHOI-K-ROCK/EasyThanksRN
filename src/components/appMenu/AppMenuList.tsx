import React, { useCallback } from 'react';
import AppMenuListItem from './AppMenuListItem';
import { FlatList, ListRenderItem } from 'react-native';
import { AppMenuDataType } from '../../screens/appMenu/AppMenuScreen';

type Props = {
    menus: AppMenuDataType[];
};

const AppMenuList = (props: Props) => {
    const { menus } = props;

    const renderListItem: ListRenderItem<AppMenuDataType> = useCallback(({ item }) => {
        return <AppMenuListItem {...item} />;
    }, []);

    const keyExtractor = useCallback((_: AppMenuDataType, index: number) => {
        return index.toString();
    }, []);

    return <FlatList data={menus} renderItem={renderListItem} keyExtractor={keyExtractor} />;
};

export default AppMenuList;
