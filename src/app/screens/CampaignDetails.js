import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, Button, Surface } from 'react-native-paper';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { SliderBox } from 'react-native-image-slider-box';
import LocationText from '../components/LocationText';
import CartSheet from '../components/products/CartSheet';
import SmallTextChip from '../components/core/SmallTextChip';
import { WebViewQuillJS } from 'react-native-webview-quilljs';

// Configurations
import { environment } from '../environment';

// styling
import { TextStyle, AppbarStyle, GlobalStyle, Theme } from '../styles/Theme';

export default function CampaignDetails({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const { campaign } = route.params;
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isLoading) {
      setImages([`${environment.host}${campaign.banner_ad_path}`]);
      setLoading(false);
    }
  }, [isLoading]);

  const viewPromotions = () => {
    navigation.navigate('Campaign Products', { campaign });
  };

  const renderAppbar = () => {
    return (
      <Appbar.Header style={AppbarStyle.transparent}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <SliderBox images={images} sliderBoxHeight={160} />
      </View>
    );
  };

  /**
   * Modify screen views HERE
   * @returns
   */
  const renderContent = () => {
    return (
      <View style={[GlobalStyle.contentContainer, { paddingVertical: 18 }]}>
        <LocationText
          text={campaign.store.store_name}
          color={Theme.colors.primary}
        />
        <Text style={[TextStyle.headline6, styles.campaignName]}>
          {campaign.name}
        </Text>
        <View style={styles.quillContainer}>
          <WebViewQuillJS
            isReadOnly
            backgroundColor={Theme.colors.background}
            content={campaign.description}
          />
        </View>
      </View>
    );
  };

  // Dont modify below!
  return (
    <View style={GlobalStyle.screenContainer}>
      <CollapsibleToolbar
        renderNavBar={renderAppbar}
        renderContent={renderContent}
        renderToolBar={renderHeader}
      />
      <Surface style={styles.bottomSheet}>
        <Button
          icon="shopping"
          mode="contained"
          style={styles.bottomButton}
          onPress={viewPromotions}
        >
          View promotions
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {},
  chipContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 8,
  },
  campaignName: {
    marginTop: 8,
    marginBottom: 4,
  },
  productExtraText: {
    marginVertical: 4,
  },
  quillContainer: {
    height: 500,
    marginTop: 18,
  },
  bottomSheet: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
  },
  bottomButton: {
    marginVertical: 18,
  },
});
