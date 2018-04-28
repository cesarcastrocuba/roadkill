﻿using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;

namespace Roadkill.Text.Sanitizer
{
	public class HtmlElement
	{
		[XmlAttribute]
		public string Name { get; set; }
		public List<HtmlAttribute> AllowedAttributes { get; set; }

		public HtmlElement() { }
		public HtmlElement(string name, string[] allowedAttributes)
		{
			Name = name;
			AllowedAttributes = new List<HtmlAttribute>();
			foreach (string attribute in allowedAttributes)
			{
				AllowedAttributes.Add(new HtmlAttribute(attribute));
			}
		}

		public bool ContainsAttribute(string name)
		{
			if (string.IsNullOrEmpty(name))
				return false;

			return AllowedAttributes.Any(x => x.Name.ToLower() == name.ToLower());
		}
	}
}