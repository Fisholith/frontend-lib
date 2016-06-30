import { provide } from 'ng-metadata/core';
import { LoadDirective } from './load-directive';

export default angular.module( 'gj.Load', [] )
.directive( ...provide( LoadDirective ) )
.name;