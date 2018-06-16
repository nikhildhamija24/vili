import PropTypes from "prop-types"
import React from "react"
import { Nav } from "react-bootstrap"
import { connect } from "react-redux"

import LinkMenuItem from "../LinkMenuItem"

function mapStateToProps(state, ownProps) {
  const envName = state.app.get("env")
  const env = state.envs.getIn(["envs", envName])
  return {
    env,
    envName,
    nav: state.app.get("nav"),
  }
}

export class SideNav extends React.Component {
  get navItems() {
    const { env, nav } = this.props
    if (!env || !nav) {
      return
    }
    var items = []

    items.push(
      <LinkMenuItem
        key="releases"
        to={`/${env.name}/releases`}
        active={nav.item === "releases"}
      >
        Releases
      </LinkMenuItem>
    )

    if (env.deployments && !env.deployments.isEmpty()) {
      items.push(
        <LinkMenuItem
          key="deployments"
          to={`/${env.name}/deployments`}
          active={nav.item === "deployments" && !nav.subItem}
        >
          Deployments
        </LinkMenuItem>
      )
      if (nav.item === "deployments") {
        env.deployments.forEach(deployment => {
          items.push(
            <LinkMenuItem
              key={`deployments-${deployment}`}
              to={`/${env.name}/deployments/${deployment}`}
              subitem
              active={nav.item === "deployments" && nav.subItem === deployment}
            >
              {deployment}
            </LinkMenuItem>
          )
        })
      }
    }
    if (env.jobs && !env.jobs.isEmpty()) {
      items.push(
        <LinkMenuItem
          key="jobs"
          to={`/${env.name}/jobs`}
          active={nav.item === "jobs" && !nav.subItem}
        >
          Jobs
        </LinkMenuItem>
      )
      if (nav.item === "jobs") {
        env.jobs.forEach(job => {
          items.push(
            <LinkMenuItem
              key={`jobs-${job}`}
              to={`/${env.name}/jobs/${job}`}
              subitem
              active={nav.item === "jobs" && nav.subItem === job}
            >
              {job}
            </LinkMenuItem>
          )
        })
      }
    }
    if (env.functions && !env.functions.isEmpty()) {
      items.push(
        <LinkMenuItem
          key="functions"
          to={`/${env.name}/functions`}
          active={nav.item === "functions" && !nav.subItem}
        >
          Functions
        </LinkMenuItem>
      )
      if (nav.item === "functions") {
        env.functions.forEach(func => {
          items.push(
            <LinkMenuItem
              key={`functions-${func}`}
              to={`/${env.name}/functions/${func}`}
              subitem
              active={nav.item === "functions" && nav.subItem === func}
            >
              {func}
            </LinkMenuItem>
          )
        })
      }
    }
    if (env.configmaps && !env.configmaps.isEmpty()) {
      items.push(
        <LinkMenuItem
          key="configmaps"
          to={`/${env.name}/configmaps`}
          active={nav.item === "configmaps" && !nav.subItem}
        >
          Config Maps
        </LinkMenuItem>
      )
      if (nav.item === "configmaps") {
        env.configmaps.forEach(configmap => {
          items.push(
            <LinkMenuItem
              key={`configmaps-${configmap}`}
              to={`/${env.name}/configmaps/${configmap}`}
              subitem
              active={nav.item === "configmaps" && nav.subItem === configmap}
            >
              {configmap}
            </LinkMenuItem>
          )
        })
      }
    }
    if(env.ssmparamters && !env.ssmparamters.isEmpty()) {
      items.push(
        <LinkMenuItem 
          key="ssmparameters"
          to={`${env.name}/ssmparameters`}
          active={nav.item === "ssmparamters" && !nav.subitem}
        > 
          SsmParameters 
        </LinkMenuItem>
      )
    }
    items.push(
      <LinkMenuItem
        key="nodes"
        to={`/${env.name}/nodes`}
        active={nav.item === "nodes"}
      >
        Nodes
      </LinkMenuItem>
    )
    items.push(
      <LinkMenuItem
        key="pods"
        to={`/${env.name}/pods`}
        active={nav.item === "pods"}
      >
        Pods
      </LinkMenuItem>
    )
    return items
  }

  render() {
    return (
      <Nav className="side-nav" stacked>
        {this.navItems}
      </Nav>
    )
  }
}

SideNav.propTypes = {
  env: PropTypes.object,
  nav: PropTypes.object,
}

export default connect(mapStateToProps)(SideNav)
