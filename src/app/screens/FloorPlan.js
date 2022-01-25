import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View, StyleSheet, Image } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-snap-carousel';
import AppbarScreen from '../components/core/AppbarScreen';
import Loading from '../components/Loading';
import { renderChips } from '../components/products/Extra';

// Utilities
import { getToken } from '../services/AuthenticationService';

// Configurations
import { environment } from '../environment';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle, Theme } from '../styles/Theme';

export default function FloorPlan({ navigation, route }) {
  const { width: screenWidth } = Dimensions.get('window');
  const { store, cart } = route.params;
  const url = useRef('');
  const webView = useRef(null);

  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isLoading) {
      // console.log(`[FloorPlan.js/useEffect] Store: ${JSON.stringify(store)}`);
      // console.log(`[FloorPlan.js/useEffect] Cart: ${JSON.stringify(cart)}`);
      getToken().then((data) => {
        url.current = `${environment.clientHost}/layout-product-viewer/store/${store.uuid}?cart=${cart.uuid}&token=${data}`;
        console.log(`[FloorPlan.js/useEffect] url : ${url.current}`);
        setLoading(false);
      });
    }
  }, [isLoading]);

  const processMessage = (event) => {
    // OnMessage processing
    //
    let data = JSON.parse(event.nativeEvent.data);
    // console.log(
    //   `[FloorPlan.js/processMessage] Web data : ${JSON.stringify(data)}`
    // );
    setProducts(data);
  };

  const sendMessage = (index) => {
    let messageObject = {
      type: 'flyTo',
      product_uuid: products[index].uuid,
    };
    let script = `
    window.postMessage(${JSON.stringify(messageObject)});
    true;
    `;
    console.log(`[FloorPlan.js/sendMessage] Script: ${script}`);

    if (webView.current) {
      webView.current.injectJavaScript(script);
    }
  };

  const renderCarousel = ({ item, index }) => {
    return (
      <Surface style={styles.productCardContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/96' }}
          style={styles.productImage}
        />
        <View style={styles.productDetailsContainer}>
          <Text style={[TextStyle.body2, styles.text]} numberOfLines={2}>
            {item.name}
          </Text>
          <View>{renderChips(item.stock_status)}</View>
        </View>
      </Surface>
    );
  };

  return (
    <AppbarScreen name="Floor Plan">
      {isLoading ? (
        <View style={GlobalStyle.center}>
          <Loading message="Fetching floor plan" />
        </View>
      ) : (
        <View style={styles.container}>
          <WebView
            ref={webView}
            onMessage={processMessage}
            style={StyleSheet.absoluteFillObject}
            hideKeyboardAccessoryView={true}
            source={{
              uri: url.current,
            }}
          />
          <Carousel
            containerCustomStyle={styles.carousel}
            contentContainerCustomStyle={styles.carouselContent}
            data={products}
            renderItem={renderCarousel}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 44}
            onSnapToItem={sendMessage}
          />
        </View>
      )}
    </AppbarScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    marginBottom: 16,
  },
  carouselContent: {
    alignItems: 'flex-end',
  },
  productCardContainer: {
    height: 120,
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: Theme.roundness,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 2,
  },
  productImage: {
    width: 96,
    height: 96,
    borderRadius: Theme.roundness,
  },
  productDetailsContainer: {
    marginStart: 12,
    flexShrink: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    flexShrink: 1,
  },
});
