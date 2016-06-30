import { provide } from 'ng-metadata/core';
import { Ruler } from './ruler-service';

export default angular.module( 'gj.Ruler', [] )
.service( ...provide( 'Ruler', { useClass: Ruler } ) )
.name;