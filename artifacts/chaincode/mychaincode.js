'use strict';

const ClientIdentity = require('fabric-shim').ClientIdentity;
const { Contract } = require('fabric-contract-api');

class CarContract extends Contract {

    async Exists(ctx, carId) {
        const buffer = await ctx.stub.getState(carId);
        return (!!buffer && buffer.length > 0);
    }

    async create(ctx, carId, value) {
        const identity = ctx.ClientIdentity;
            // Check if the identity has the 'manufacturer' attribute set to 'true'
        const checkAttr = identity.assertAttributeValue('manufacturer', 'true');
        if (checkAttr) {
            const exists = await this.Exists(ctx, carId);
            if (exists) {
                throw new Error(`The car ${carId} already exists`);
            }
            const car = new Car();
            car.value = value;
            const buffer = Buffer.from(JSON.stringify(car));
            await ctx.stub.putState(carId, buffer);
        } else {
            throw new Error('You must be a manufacturer to carry out this transaction!');
        }
    }

    async read(ctx, carId) {
        const exists = await this.Exists(ctx, carId);
        if (!exists) {
            throw new Error(`The car ${carId} does not exist`);
        }
        const buffer = await ctx.stub.getState(carId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async update(ctx, carId, newValue) {
        const exists = await this.Exists(ctx, carId);
        if (!exists) {
            throw new Error(`The car ${carId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(carId, buffer);
    }

    async delete(ctx, carId) {
        const exists = await this.Exists(ctx, carId);
        if (!exists) {
            throw new Error(`The car ${carId} does not exist`);
        }
        await ctx.stub.deleteState(carId);
    }

}

module.exports = CarContract;


