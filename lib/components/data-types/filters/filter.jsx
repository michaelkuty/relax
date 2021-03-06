import find from 'lodash.find';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import getFilterDefaultOptions from '../../../helpers/schema-filter-default-options';
import Balloon from '../../balloon';
import Edit from './edit';

export default class Filter extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    filter: PropTypes.object.isRequired,
    schemaProperties: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    selectFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
    new: PropTypes.bool
  }

  getDateString (gran, value) {
    let str;
    if (gran === 'present') {
      str = 'present';
    } else {
      str = `${value} ${gran}${value !== 1 && 's' || ''}`;
    }
    return str;
  }

  onClick () {
    this.props.selectFilter(this.props.index);
  }

  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removeFilter(this.props.index);
  }

  render () {
    return (
      <div className='filter-item white-options'>
        <div className='filter' onClick={::this.onClick}>
          {this.renderContent()}
          {!this.props.new && <div className='filter-remove' onClick={::this.onRemove}><i className='material-icons'>delete</i></div>}
        </div>
        {this.renderEditing()}
      </div>
    );
  }

  renderContent () {
    let result;
    const {filter, schemaProperties} = this.props;
    const property = find(schemaProperties, 'id', filter.prop);

    if (property) {
      const options = Object.assign({}, getFilterDefaultOptions(property.type), filter.options);

      switch (property.type) {
        case 'Date':
          result = (
            <div>
              <span>{property.title}</span>
              <span> from </span>
              <span className='highlight'>{this.getDateString(options.fromGran, options.fromValue)}</span>
              <span> up to </span>
              <span className='highlight'>{this.getDateString(options.toGran, options.toValue)}</span>
            </div>
          );
          break;
        case 'Boolean':
          result = (
            <div>
              <span>{property.title}</span>
              <span> is </span>
              <span className='highlight'>{options.value}</span>
            </div>
          );
          break;
        default:
          if (options.op === 'equal') {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> equals</span>
                <span> to </span>
                <span className='highlight'>{options.value}</span>
              </div>
            );
          } else if (options.op === 'not-equal') {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> differs</span>
                <span> from </span>
                <span className='highlight'>{options.value}</span>
              </div>
            );
          } else if (options.op === 'set') {
            result = (
              <div>
                <span>{property.title}</span>
                <span> is </span>
                <span className='highlight'>set</span>
              </div>
            );
          } else if (options.op === 'not-set') {
            result = (
              <div>
                <span>{property.title}</span>
                <span> is </span>
                <span className='highlight'>not set</span>
              </div>
            );
          }
      }
    }

    return result;
  }

  renderEditing () {
    if (this.props.editing) {
      return (
        <Balloon>
          <Edit {...this.props} />
        </Balloon>
      );
    }
  }
}
