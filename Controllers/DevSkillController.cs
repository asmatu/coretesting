using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace coretesting.Controllers
{
    [Route("api/[controller]")]
    public class DevSkillController : Controller
    {
        private static string[] Names = new[]
        {
            "Frank", "Jim", "Phil", "Mary", "Sophie", "Mark", "Ben", "Nick", "Matt", "Jonathan"
        };

        [HttpGet("[action]")]
        public IEnumerable<DevSkills> GetDevSkills()
        {
            // To demonstrate delay of request
            System.Threading.Thread.Sleep(1500);

            // For used indexes of Names array
            var usedIndexes = new HashSet<int>();

            var result = new List<DevSkills>();

            var rnd = new Random();

            // Create sample data
            for (int i = 0; i < 5; i++)
            {
                // Do not use same index twice to prevent duplicate objects
                int index;
                do 
                {
                    index = rnd.Next(0, Names.Length - 1);
                }
                while (usedIndexes.Contains(index));

                result.Add(new DevSkills(){Name = Names[index], DevSkillLevel = rnd.Next(1,5)});                
                
                // Add used index to list
                usedIndexes.Add(index);
            }

            return result;
        }

        public class DevSkills
        {
            public string Name { get; set; }
            public int DevSkillLevel { get; set; }
        }
    }
}
