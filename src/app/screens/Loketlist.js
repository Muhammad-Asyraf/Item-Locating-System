import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Appbar, Title, Dialog } from "react-native-paper";
import CartListItem from "../components/CartListItem";
import CartHeader from "../components/CartHeader";
import Loading from "../components/Loading";

// Utilities
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Environment configs
import { environment } from "../environment";

// Styling
import { GlobalStyle } from "../styles/theme";
import { appBarStyles } from "../styles/appBarStyles";

export default function Loketlist({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const cartUuid = route.params.query;

    const cart = useSelector((state) => state.cart);
    const { default_cart_uuid } = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    // Create a data list
    const [DATA, setData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(
                environment.host +
                    "/api/mobile/planning-cart-service/cart/" +
                    cartUuid,
                auth.authHeader
            );
            let totalPrice = 0;
            let DATA = [];
            for (i = 0; i < cart.products.length; i++) {
                totalPrice +=
                    data.products[i].selling_price * data.products[i].quantity;
                DATA.push({
                    key: i,
                    cart_uuid: default_cart_uuid,
                    product_uuid: cart.products[i],
                    name: data.products[i].name,
                    quantity: data.products[i].quantity,
                    selling_price: data.products[i].selling_price,
                    imageUrl: "https://tinyurl.com/cu8nm69m",
                });
            }
            console.log("Loaded all products into array");
            setData(DATA);
            setTotalPrice(totalPrice);
            setLoading(false);
        };
        if (isLoading) {
            fetchProducts();
        }
    }, [isLoading]);

    const refreshCart = () => {
        setLoading(true);
    };

    if (isLoading) {
        return (
            <View style={GlobalStyle.screenContainer}>
                <Appbar.Header
                    style={[appBarStyles.appBarContainer, { elevation: 0 }]}
                >
                    {navigation.canGoBack() ? (
                        <Appbar.BackAction
                            color="#007AFF"
                            onPress={navigation.goBack}
                        />
                    ) : null}
                    <Text style={appBarStyles.appBarTitle}>CART</Text>
                </Appbar.Header>
                <Loading />
            </View>
        );
    }

    if (cart.products.length === 0) {
        return (
            <View style={GlobalStyle.screenContainer}>
                <Appbar.Header
                    style={[appBarStyles.appBarContainer, { elevation: 0 }]}
                >
                    {navigation.canGoBack() ? (
                        <Appbar.BackAction
                            color="#007AFF"
                            onPress={navigation.goBack}
                        />
                    ) : null}
                    <Text style={appBarStyles.appBarTitle}>CART</Text>
                </Appbar.Header>
                <View
                    style={[
                        GlobalStyle.contentContainer,
                        { justifyContent: "center", alignItems: "center" },
                    ]}
                >
                    <Text>Your cart is empty!</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={GlobalStyle.screenContainer}>
            <Appbar.Header
                style={[
                    appBarStyles.appBarContainer,
                    {
                        elevation: 0,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#CBCBCB",
                    },
                ]}
            >
                {navigation.canGoBack() ? (
                    <Appbar.BackAction
                        color="#007AFF"
                        onPress={navigation.goBack}
                    />
                ) : null}
                <Text style={appBarStyles.appBarTitle}>CART</Text>
            </Appbar.Header>
            <CartHeader price={"RM" + totalPrice} />
            <FlatList
                style={styles.sectionListView}
                onRefresh={refreshCart}
                refreshing={isLoading}
                data={DATA}
                renderItem={({ item }) => (
                    <CartListItem item={item} style={styles.listItem} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionListView: {
        paddingHorizontal: 18,
        marginTop: 8,
    },
    listSectionContainer: {
        marginVertical: 8,
    },
    listSection: {
        color: "#707070",
        fontFamily: "interSemiBold",
        fontSize: 14,
        letterSpacing: 0.1,
        marginHorizontal: 16,
    },
    listItem: {
        marginVertical: 8,
    },
});
