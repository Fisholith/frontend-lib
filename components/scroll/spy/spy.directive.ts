import 'core-js/es6/map';
import * as Vue from 'vue';

import { Scroll } from '../scroll.service';
import { Ruler } from '../../ruler/ruler-service';

interface Spy
{
	id: string;
	el: HTMLElement;
	target?: HTMLElement;
	targetTop?: number;
	targetHeight?: number;
}

const spies: Spy[] = [];
let activeSpy: Spy | undefined;

function refreshSpies()
{
	spies
		.map( ( spy ) =>
		{
			const target = document.getElementById( spy.id );
			if ( !target ) {
				spy.target = undefined;
				return spy;
			}

			const targetOffset = Ruler.offset( target );
			spy.target = target;
			spy.targetTop = targetOffset.top;
			spy.targetHeight = targetOffset.height;

			return spy;
		} )
		.sort( ( a, b ) => a.targetTop - b.targetTop );
}

function activateSpy( spy: Spy )
{
	if ( activeSpy ) {
		activeSpy.el.classList.remove( 'active' );
	}
	else if ( activeSpy === spy ) {
		return;
	}

	spy.el.classList.add( 'active' );
	activeSpy = spy;
}

let lastScrollHeight: number | undefined = undefined;
Scroll.scrollChanges.subscribe( () =>
{
	const scrollTop = Math.ceil( Scroll.getScrollTop() );
	const scrollHeight = Scroll.getScrollHeight();
	const maxScroll = scrollHeight - (
		Scroll.context === document
		? window.innerHeight
		: (Scroll.context as HTMLElement).offsetHeight
	);
	let found = false;

	// Only refresh the spy data if the scroll offset has changed.
	// We do this for perf reasons.
	if ( lastScrollHeight !== scrollHeight ) {
		lastScrollHeight = scrollHeight;
		refreshSpies();
	}

	// If we've hit the bottom of the scroll container, then activate the last spy.
	if ( scrollTop >= maxScroll ) {
		const spy = spies[ spies.length - 1 ];
		if ( spy && spy.target ) {
			activateSpy( spy );
		}
		return;
	}

	// If we have an active spy and we are scrolled back up before it we want to
	// clear it out. If the active spy's top position is the start of the
	// window, then keep it active.
	if ( activeSpy && scrollTop < activeSpy.targetTop && activeSpy.targetTop > 0 ) {
		activeSpy.el.classList.remove( 'active' );
		activeSpy = undefined;
		return;
	}

	spies.forEach( ( spy ) =>
	{
		if ( found ) {
			return;
		}

		if ( scrollTop >= spy.targetTop && scrollTop < spy.targetTop + spy.targetHeight ) {
			spy.el.classList.add( 'active' );
			activateSpy( spy );
			found = true;
		}
	} );
} );

export const AppScrollSpy: Vue.DirectiveOptions = {
	bind( el, binding )
	{
		const id: string = binding.value || (el.getAttribute( 'href' ) || '').substring( 1 );
		if ( !id ) {
			console.error( new Error( `Couldn't get scroll spy ID.` ) );
			return;
		}

		spies.push( { id, el } );
		refreshSpies();
	},
	unbind( el )
	{
		const index = spies.findIndex( ( item ) => item.el === el );
		if ( index ) {
			spies.splice( index, 1 );
		}
	},
};