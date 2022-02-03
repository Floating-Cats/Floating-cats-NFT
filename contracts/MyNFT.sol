// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FloatingCats is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    // this make sure that the same uri don't get minted twice
    mapping(string => uint8) existingURIs;

    // variables
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.02 ether;
    uint256 public maxSupply = 9;
    uint256 public maxMintAmount = 2;
    bool public paused = false;
    bool public revealed = false;
    string public notRevealedUri;
    mapping(address => bool) public whitelisted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        mint(msg.sender, 1);
    }

    // function _baseURI() internal pure override returns (string memory) {
    //     return "ipfs://";
    // }
    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        existingURIs[uri] = 1;
    }

    // takes in a recipient and metadata content id as arguments
    // then mint a new token with that data
    function payToMint(address recipient, string memory metadataURI)
        public
        payable
        returns (uint256)
    {
        require(existingURIs[metadataURI] != 1, "NFT already minted!");
        require(msg.value >= cost, "Need to pay up!");

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    // takes in a uri as its arguement and returns true if
    // that uri already exists in the mapping,
    // this make sure if an existing uri is already owned
    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // https://github.com/HashLips/solidity_smart_contracts/blob/main/contracts/NFT/NFT.sol
    // =========================================================

    // TODO: remove error message for minimal gas cost
    // public
    function mint(address _to, uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();

        // tests before transaction
        require(!paused, "Our contract is on paused");
        require(_mintAmount > 0, "Mint amount must be greater than zero");
        require(
            _mintAmount <= maxMintAmount,
            string(
                abi.encodePacked(
                    "Mint amount must be less than ",
                    bytes32(maxMintAmount)
                )
            )
        );
        require(
            supply + _mintAmount <= maxSupply,
            string(
                abi.encodePacked(
                    "Your mint amount has exceeded the number of our supply, ",
                    "Only ",
                    bytes32(maxSupply - supply),
                    " left."
                )
            )
        );

        if (msg.sender != owner()) {
            if (whitelisted[msg.sender] != true) {
                require(msg.value >= cost * _mintAmount, "Error555");
            }
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(_to, supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    //only owner
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function whitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = true;
    }

    function removeWhitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = false;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    // function tokenURI(uint256 tokenId)
    //     public
    //     view
    //     override(ERC721, ERC721URIStorage)
    //     returns (string memory)
    // {
    //     return super.tokenURI(tokenId);
    // }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
