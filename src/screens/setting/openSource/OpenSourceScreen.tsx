import React, { useMemo } from 'react';

import { FlatList, ListRenderItem } from 'react-native';
import SafeAreaView from '../../../components/common/SafeAreaView';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import ScreenLayout from '../../../components/common/ScreenLayout';
import OpenSourceListItem from '../../../components/setting/openSource/OpenSourceListItem';

import { OpenSourceScreenNavigationProps } from '../../../@types/navigations/settingStack';

import { useNavigation } from '@react-navigation/native';

import OPEN_SOURCE_DATA from '../../../../licenses/licenses.json';
import { OpenSourceDataType } from '../../../@types/openSource';

const OpenSourceScreen = () => {
    const { navigate, goBack } = useNavigation<OpenSourceScreenNavigationProps>();

    const openSourceDatas = useMemo(() => Object.values(OPEN_SOURCE_DATA).map(data => data), []);

    const handleNavigateOpenSourceDetail = (data: OpenSourceDataType) => {
        navigate('OpenSourceDetailScreen', { data });
    };

    const renderItem: ListRenderItem<any> = ({ item }) => {
        return <OpenSourceListItem data={item} onPress={handleNavigateOpenSourceDetail} />;
    };

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={'오픈소스'} goBack={goBack} />
            <ScreenLayout>
                <FlatList initialNumToRender={30} data={openSourceDatas} renderItem={renderItem} />
            </ScreenLayout>
        </SafeAreaView>
    );
};

export default OpenSourceScreen;
