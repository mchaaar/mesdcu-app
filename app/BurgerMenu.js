import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store';

export default function BurgerMenu() {
  const [visible, setVisible] = React.useState(false);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    router.replace('/');
  };

  return (
    <View style={styles.menuContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="menu" size={30} onPress={openMenu} />}
      >
        <Menu.Item onPress={() => { closeMenu(); router.navigate('/dashboard'); }} title="Dashboard" />
        <Menu.Item onPress={() => { closeMenu(); router.navigate('/account'); }} title="My Profil" />
        <Menu.Item onPress={handleLogout} title="Logout" />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 10,  
    right: 15, 
    zIndex: 1000,
  },
});
