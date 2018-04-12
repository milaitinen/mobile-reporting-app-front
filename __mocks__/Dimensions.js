'use strict';

const Dimensions = {
    get: jest.fn().mockReturnValue({ width: 200, height: 400 })
};

module.exports = Dimensions;