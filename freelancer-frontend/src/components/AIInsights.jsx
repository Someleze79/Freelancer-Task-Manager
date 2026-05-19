import { motion } from "framer-motion";

import {
  Sparkles
} from "lucide-react";

export default function AIInsights({
  suggestions
}) {

  return (

    <div className="space-y-4">

      {suggestions.map(
        (suggestion, index) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              y: 10
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: index * 0.1
            }}

            className="
              bg-slate-900
              border
              border-slate-700
              rounded-2xl
              p-4
              flex
              gap-4
              items-start
            "
          >

            <Sparkles className="
              text-purple-400
              w-5
              h-5
              mt-1
            " />

            <p className="
              text-gray-300
              leading-relaxed
            ">

              {suggestion}

            </p>

          </motion.div>

        )
      )}

    </div>
  );
}