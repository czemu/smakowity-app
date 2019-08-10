import React from 'react';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import HomeScene from './scenes/HomeScene';
import CategoriesScene from './scenes/CategoriesScene';
import SearchScene from './scenes/SearchScene';
import FavoritesScene from './scenes/FavoritesScene';
import RecipeScene from './scenes/RecipeScene';
import CategoryScene from './scenes/CategoryScene';
import Colors from './constants/Colors';

class RouterComponent extends React.PureComponent {
    render() {
        return (
            <Router backAndroidHandler={() => (false)} sceneStyle={{backgroundColor: '#eee'}}>
                <Stack key="root" hideNavBar={true} >
                    <Stack tabs={true} tabBarStyle={styles.tabBarStyle} activeTintColor={Colors.redColor} headerForceInset={{ top: 'never' }}>
                        <Scene key="home" component={HomeScene } headerForceInset={{ top: 'never' }} />
                        <Scene key="categories" component={CategoriesScene} />
                        <Scene key="search" component={SearchScene} />
                        <Scene key="favorites" component={FavoritesScene} />
                    </Stack>
                    <Scene key="recipe" component={RecipeScene} hideNavBar={false} />
                    <Scene key="category" component={CategoryScene} hideNavBar={false} />
                </Stack>
            </Router>
        );
    }
}

const styles = {
    tabBarStyle: {
        backgroundColor: '#fff'
    }
};

export default RouterComponent;
