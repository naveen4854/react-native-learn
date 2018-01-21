import React from 'react';
import { connect } from 'react-redux';
import { Image, Linking, StyleSheet, Platform, Text, View, Button } from 'react-native';

export default function requiresAuth(Component, options) {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        componentWillMount() {
            this.checkAndRedirect(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAndRedirect(nextProps);
        }

        componentDidUpdate() {
        }

        checkAndRedirect(props) {
            console.log(props, 'AuthenticatedComponent')
            // authenticate and authorize
        }

        authorize(auth, authorizedRoles) {
            // authorize
        }

        render() {
            return (
                <View>
                    <Component {...this.props} />
                </View>
            );
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {

        }
    }

    const mapStateToProps = (state) => {
        return {
            auth: state.auth
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
