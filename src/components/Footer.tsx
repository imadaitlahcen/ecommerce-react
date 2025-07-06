"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      className="bg-background border-t border-border"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-md flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl text-foreground">Shop</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your next-generation shopping destination powered by AI and designed for the future.
            </p>
          </motion.div>

          {[
            {
              title: "Shop",
              links: [
                { name: "All Products", path: "/shop" },
                { name: "Categories", path: "/categories" },
                { name: "New Arrivals", path: "/new" },
                { name: "Sale", path: "/sale" },
              ],
            },
            {
              title: "Support",
              links: [
                { name: "Help Center", path: "/help" },
                { name: "Contact Us", path: "/contact" },
                { name: "Shipping Info", path: "/shipping" },
                { name: "Returns", path: "/returns" },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About Us", path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: "Press", path: "/press" },
                { name: "Blog", path: "/blog" },
              ],
            },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h3 className="font-semibold mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>&copy; 2024 Shop. All rights reserved. Built for the future of commerce.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
