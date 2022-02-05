import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Dimensions, View, StyleSheet, Image } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-snap-carousel';
import ProductListItem from '../components/products/ProductListItem';
import AppbarScreen from '../components/core/AppbarScreen';
import Loading from '../components/Loading';
import { renderChips } from '../components/products/Extra';
import BottomSheet, {
  BottomSheetView,
  BottomSheetSectionList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';

// Utilities
import { getToken } from '../services/AuthenticationService';
import { hasLayouts } from '../services/StoreService';

// Configurations
import { environment } from '../environment';

// Styling
import { GlobalStyle, AppbarStyle, TextStyle, Theme } from '../styles/Theme';

export default function FloorPlan({ navigation, route }) {
  const { width: screenWidth } = Dimensions.get('window');
  const { store, cart } = route.params;
  const url = useRef('');
  const webView = useRef(null);

  // Bottom Sheet
  const bottomSheet = useRef(null);
  const snapPoints = useMemo(() => [156, '60%'], []);
  const [currentSnapIdx, setSnapIdx] = useState(0);
  const productList = useRef(null);

  const [isLoading, setLoading] = useState(true);
  const [hasLayout, setHasLayout] = useState(false);
  const [products, setProducts] = useState([]);
  const [focusingProduct, setFocusingProduct] = useState({});

  useEffect(() => {
    if (isLoading) {
      // console.log(`[FloorPlan.js/useEffect] Store: ${JSON.stringify(store)}`);
      // console.log(`[FloorPlan.js/useEffect] Cart: ${JSON.stringify(cart)}`);

      // Check if store has any layouts

      getToken().then((data) => {
        url.current = `${environment.clientHost}/layout-product-viewer/store/${store.uuid}?cart=${cart.uuid}&token=${data}`;
        // console.log(`[FloorPlan.js/useEffect] url : ${url.current}`);
      });

      hasLayouts(store.uuid)
        .then((data) => {
          setHasLayout(data);
          setLoading(false);
        })
        .catch((error) => {});
    }
  }, [isLoading]);

  const processMessage = (event) => {
    // OnMessage processing
    let data = JSON.parse(event.nativeEvent.data);
    console.log(
      `[FloorPlan.js/processMessage] Web data : ${JSON.stringify(data)}`
    );
    if ('type' in data) {
      if (data?.type === 'init') {
        setProducts(data.products);
      } else if (data?.type === 'partitionFocus') {
        // TODO:
      }
    }
  };

  const flyTo = (item) => {
    let messageObject = {
      type: 'flyTo',
      product_uuid: item.uuid,
    };
    let script = `
    window.postMessage(${JSON.stringify(messageObject)});
    true;
    `;
    // console.log(`[FloorPlan.js/sendMessage] Script: ${script}`);

    if (webView.current) {
      webView.current.injectJavaScript(script);
      bottomSheet?.current.snapToIndex(0);
      setFocusingProduct(item);
    }
  };

  const updateSnapIdx = (index) => {
    setSnapIdx(index);
  };

  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={TextStyle.subhead2}>{section.label}</Text>
      </View>
    );
  };
  const renderSectionItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => flyTo(item)}>
        <ProductListItem
          product={item}
          containerStyle={{ marginVertical: 8 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <AppbarScreen name="Floor Plan">
      {isLoading ? (
        <View style={GlobalStyle.center}>
          <Loading message="Fetching floor plan" />
        </View>
      ) : hasLayout ? (
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
          {products.length != 0 && (
            <BottomSheet
              ref={bottomSheet}
              style={styles.bottomSheet}
              snapPoints={snapPoints}
              onChange={updateSnapIdx}
            >
              {currentSnapIdx === 0 && Object.keys(focusingProduct).length > 0 && (
                <Animated.View
                  style={styles.focusedProductContainer}
                  layout={Layout.springify()}
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  <ProductListItem product={focusingProduct} />
                </Animated.View>
              )}
              <BottomSheetSectionList
                ref={productList}
                sections={products}
                renderItem={renderSectionItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.sectionListContainer}
              />
            </BottomSheet>
          )}
          {/* <Carousel
            containerCustomStyle={styles.carousel}
            contentContainerCustomStyle={styles.carouselContent}
            data={products}
            renderItem={renderCarousel}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 44}
            onSnapToItem={sendMessage}
          /> */}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[TextStyle.body1, { marginHorizontal: 24 }]}>
            Store does not any floor maps. Please ask the store's staffs for
            assistance
          </Text>
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
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  focusedProductContainer: {
    marginHorizontal: 18,
  },
  sectionHeaderContainer: {
    paddingVertical: 8,
  },
  sectionListContainer: {
    marginHorizontal: 18,
    marginVertical: 8,
  },
});
