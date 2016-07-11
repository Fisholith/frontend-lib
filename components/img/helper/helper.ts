import { provide } from 'ng-metadata/core';
import { ImgHelper } from './helper-service';

export default angular.module( 'gj.Img.Helper', [] )
.service( ...provide( 'ImgHelper', { useClass: ImgHelper } ) )
.name;