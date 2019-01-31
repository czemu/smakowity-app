import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import HomeScene from './scenes/HomeScene';
import CategoriesScene from './scenes/CategoriesScene';
import SearchScene from './scenes/SearchScene';
import FavoritesScene from './scenes/FavoritesScene';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" tabs={true} tabBarStyle={styles.tabBarStyle}>
                <Scene key="home" component={HomeScene } />
                <Scene key="categories" component={CategoriesScene} />
                <Scene key="search" component={SearchScene} />
                <Scene key="favorites" component={FavoritesScene} />
            </Stack>
        </Router>
    );
}

const styles = {
    tabBarStyle: {
        backgroundColor: '#fff'
    }
};

export default RouterComponent;
