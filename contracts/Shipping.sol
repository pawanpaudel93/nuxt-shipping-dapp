// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Shipping {
    // Our predefined values for shipping listed as enums
    enum ShippingStatus {
        Pending,
        Shipped,
        Delivered
    }
    enum ShipmentStatus {
        Pending,
        Shipped,
        Delivered
    }

    // Save enum ShippingStatus in variable status
    ShippingStatus private status;
    ShipmentStatus public shipstatus;
    uint256 public numupdates;

    // Event to launch when package has arrived
    event LogNewAlert(string description);

    // This initializes our contract state (sets enum to Pending once the program starts)
    constructor() {
        status = ShippingStatus.Pending;
        numupdates = 0;
    }

    // Function to change to Shipped
    function Shipped() public {
        status = ShippingStatus.Shipped;
        shipstatus = ShipmentStatus.Shipped;
        numupdates = numupdates + 1;
    }

    // Function to change to Delivered
    function Delivered() public {
        status = ShippingStatus.Delivered;
        shipstatus = ShipmentStatus.Delivered;
        numupdates = numupdates + 1;
        emit LogNewAlert('Your package has arrived');
    }

    // Function to get the status of the shipping
    function getStatus(ShippingStatus _status)
        internal
        pure
        returns (string memory)
    {
        // Check the current status and return the correct name
        if (ShippingStatus.Pending == _status) return 'Pending';
        if (ShippingStatus.Shipped == _status) return 'Shipped';
        return 'Delivered';
    }

    // Get status of your shipped item
    function Status() public view returns (string memory) {
        ShippingStatus _status = status;
        return getStatus(_status);
    }
}
