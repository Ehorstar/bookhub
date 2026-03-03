using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace WebApplication1.Blockchain
{

    [Function("owner", "address")]
    public class OwnerFunction : FunctionMessage { }

    [Function("getBalance", "uint256")]
    public class GetBalanceFunction : FunctionMessage { }

}
