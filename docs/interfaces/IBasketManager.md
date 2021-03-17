## `IBasketManager`



The basket-manager for underlying assets attached to Charged Particles
Manages the link between NFTs and their respective Smart-Baskets


### `isPaused() → bool` (external)





### `getTokenTotalCount(address contractAddress, uint256 tokenId) → uint256` (external)





### `getTokenCountByType(address contractAddress, uint256 tokenId, address basketTokenAddress, uint256 basketTokenId) → uint256` (external)





### `addToBasket(address contractAddress, uint256 tokenId, address basketTokenAddress, uint256 basketTokenId) → bool` (external)





### `removeFromBasket(address receiver, address contractAddress, uint256 tokenId, address basketTokenAddress, uint256 basketTokenId) → bool` (external)





### `executeForAccount(address contractAddress, uint256 tokenId, address externalAddress, uint256 ethValue, bytes encodedParams) → bytes` (external)





### `getBasketAddressById(address contractAddress, uint256 tokenId) → address` (external)





### `withdrawEther(address contractAddress, uint256 tokenId, address payable receiver, uint256 amount)` (external)





### `withdrawERC20(address contractAddress, uint256 tokenId, address payable receiver, address tokenAddress, uint256 amount)` (external)





### `withdrawERC721(address contractAddress, uint256 tokenId, address payable receiver, address nftTokenAddress, uint256 nftTokenId)` (external)






### `ControllerSet(address controller)`





### `PausedStateSet(bool isPaused)`





### `NewSmartBasket(address contractAddress, uint256 tokenId, address smartBasket)`





### `BasketAdd(address contractAddress, uint256 tokenId, address basketTokenAddress, uint256 basketTokenId)`





### `BasketRemove(address receiver, address contractAddress, uint256 tokenId, address basketTokenAddress, uint256 basketTokenId)`




