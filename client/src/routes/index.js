import React from 'react'
import { Route, Switch } from 'react-router'

import SignIn from '../containers/signin/signIn';


import Home from '../containers/home/home'
import Surf from '../containers/surf/surf';
import NoMatch from '../components/NoMatch'

import Index from '../containers/index';

import RequireAuth from './require-auth';

const routes = (
    <div>
        <Index />
        <Switch>
            <Route exact path="/" component={RequireAuth(Home)} />
            <Route path="/signin" component={RequireAuth(SignIn)} />
            <Route path="/surf" component={RequireAuth(Surf)}/>
            <Route component={NoMatch} />
        </Switch>
    </div>
)

export default routes
