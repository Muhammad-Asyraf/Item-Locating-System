import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, Surface } from 'react-native-paper';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { SliderBox } from 'react-native-image-slider-box';
import LocationText from '../components/LocationText';
import CartSheet from '../components/products/CartSheet';
import SmallTextChip from '../components/core/SmallTextChip';
import { WebViewQuillJS } from 'react-native-webview-quilljs';
import Loading from '../components/Loading';

// Utilities
import { getAllCartsForUser } from '../services/LoketlistService';

// Redux
import { useSelector } from 'react-redux';

// styling
import { TextStyle, AppbarStyle, GlobalStyle, Theme } from '../styles/Theme';
import { useEffect } from 'react';

export default function ProductDetails({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const loketlists = useRef([]);
  const [isLoading, setLoading] = useState(true);
  const [images, setImages] = useState([
    'https://tinyurl.com/27wk7pdz',
    'https://tinyurl.com/2s37dtph',
  ]);
  const { product } = route.params;

  useEffect(() => {
    if (isLoading) {
      getAllCartsForUser(user.uuid)
        .then((data) => {
          loketlists.current = data.filter((cart) => !cart.is_default);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isLoading]);

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
        <SliderBox images={images} sliderBoxHeight={250} />
      </View>
    );
  };

  const renderChips = () => {
    // Stock check
    if (product.stock_status == 'In Stock') {
      return (
        <SmallTextChip
          text={product.stock_status}
          fill={true}
          color={Theme.colors.ok}
        />
      );
    } else if (product.stock_status == 'Low Stock') {
      return (
        <SmallTextChip
          text={product.stock_status}
          fill={true}
          color={Theme.colors.warn}
        />
      );
    } else {
      return (
        <SmallTextChip
          text={product.stock_status}
          fill={true}
          color={Theme.colors.error}
        />
      );
    }
    // Promo check
  };

  /**
   * Modify screen views HERE
   * @returns
   */
  const renderContent = () => {
    return (
      <View style={GlobalStyle.contentContainer}>
        <View style={styles.chipContainer}>{renderChips()}</View>
        <LocationText
          text={product.stores.store_name}
          color={Theme.colors.primary}
        />
        <Text style={[TextStyle.headline6, styles.productName]}>
          {product.name}
        </Text>
        <Text style={[TextStyle.subhead1, styles.productPrice]}>
          {`RM${product.retail_price}`}
        </Text>
        <Text
          style={[TextStyle.caption, styles.productExtraText]}
        >{`Product Type: ${product.product_type} | Measurement: ${product.measurement_value}${product.measurement_unit}`}</Text>
        <View style={styles.quillContainer}>
          <WebViewQuillJS
            isReadOnly
            backgroundColor={Theme.colors.background}
            content={product.description}
          />
        </View>
      </View>
    );
  };

  // Dont modify below!
  return (
    <View style={GlobalStyle.screenContainer}>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1, flexGrow: 1 }}>
          <CollapsibleToolbar
            renderNavBar={renderAppbar}
            renderContent={renderContent}
            renderToolBar={renderHeader}
          />
          <Surface style={styles.addToCartSheet}>
            <CartSheet product={product} loketlists={loketlists.current} />
          </Surface>
        </View>
      )}
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
  productName: {
    marginTop: 8,
    marginBottom: 4,
  },
  productPrice: {
    marginVertical: 4,
  },
  productExtraText: {
    marginVertical: 4,
  },
  quillContainer: {
    height: 500,
    marginTop: 18,
  },
  addToCartSheet: {
    backgroundColor: 'white',
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
  },
});
