import React, { Component } from "react";
import MapboxClient from "mapbox";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import styled from "styled-components";

const StyledReactGeocoder = styled.div`
  margin: 20px;
`;

class Geocoder extends Component {
  debounceTimeout = null;
  state = {
    results: [],
    showResults: false,
    inputValue: null,
    loading: false,
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (state.inputValue === null && nextProps.initialInputValue !== "") {
      return {
        inputValue: nextProps.initialInputValue,
      };
    }

    return null;
  }

  onChange = (event) => {
    const {
      queryParams,
      localGeocoder,
      limit,
      localOnly,
      onComplete,
    } = this.props;
    const queryString = event.target.value;

    this.setState({
      inputValue: event.target.value,
      loading: true,
    });

    const isFound = this.state.results.find(
      (el) => el.place_name && el.place_name === queryString
    );
    if (isFound) {
      const index = this.state.results.findIndex(
        (el) => el.place_name && el.place_name === queryString
      );
      onComplete(this.state.results[index]);
    }

    const localResults = localGeocoder ? localGeocoder(queryString) : [];
    const params = {
      ...queryParams,
      ...{ limit: limit - localResults.length },
    };

    if (params.limit > 0 && !localOnly && queryString.length > 0) {
      this.client.geocodeForward(queryString, params).then((res) => {
        this.setState({
          results: [...localResults, ...res.entity.features],
          loading: false,
        });
      });
    } else {
      this.setState({
        results: localResults,
        loading: false,
      });
    }
  };

  constructor(props) {
    super();
    this.client = new MapboxClient(props.mapboxApiAccessToken);
  }

  render() {
    const { results, inputValue } = this.state;
    return (
      <StyledReactGeocoder>
        <AutoComplete
          loading={this.state.loading}
          data={results.length > 0 ? results : []}
          value={inputValue}
          onChange={this.onChange}
          textField="place_name"
          placeholder="Add your address"
        />
      </StyledReactGeocoder>
    );
  }
}

export default Geocoder;
