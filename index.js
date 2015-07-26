/**
 * @fileOverview start the server
 *
 * Using babel-core/register to support es6 syntax
 *
 * NB: the original ytiyan.com code is quite poor
 * I don't want to refactor it now, will refactor it later
 * Adding these files just to support API request
 */

require('babel-core/register');
require('./server');
