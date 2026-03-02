using Microsoft.AspNetCore.Mvc;
using Nethereum.Web3;
using System.Numerics;
using WebApplication1.Blockchain;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/contract")]
    public class ContractController : ControllerBase
    {
        private readonly Web3 _web3;
        private readonly IConfiguration _cfg;

        public ContractController(Web3 web3, IConfiguration cfg)
        {
            _web3 = web3;
            _cfg = cfg;
        }

        [HttpGet("info")]
        public async Task<IActionResult> Info()
        {
            var contractAddress = _cfg["Blockchain:ContractAddress"];
            if (string.IsNullOrWhiteSpace(contractAddress))
                return BadRequest("Blockchain:ContractAddress is missing in appsettings.json");

            var handler = _web3.Eth.GetContractHandler(contractAddress);

            string owner;
            BigInteger balanceWei;

            try
            {
                owner = await handler.QueryAsync<OwnerFunction, string>(new OwnerFunction());
                balanceWei = await handler.QueryAsync<GetBalanceFunction, BigInteger>(new GetBalanceFunction());
            }
            catch (Exception ex)
            {

                return Problem(detail: ex.Message, title: "Blockchain call failed");
            }

            return Ok(new
            {
                contractAddress,
                owner,
                balanceWei = balanceWei.ToString()
            });
        }
    }
}
