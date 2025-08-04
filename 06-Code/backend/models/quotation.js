// models/quotation.js
const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  quote_id: {
    type: Number,
    required: true,
    unique: true
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  client_info: {
    id_client: {
      type: String,
      required: true
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    full_name: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    address: {
      type: String
    }
  },
  menu_id: {
    type: Number,
    required: true
  },
  menu_name: {
    type: String,
    required: true
  },
  menu_price_per_person: {
    type: Number,
    required: true
  },
  number_of_guests: {
    type: Number,
    required: true,
    min: 1
  },
  menu_subtotal: {
    type: Number,
    required: true
  },
  services_subtotal: {
    type: Number,
    default: 0
  },
  services: [{
    service_id: {
      type: Number,
      required: true
    },
    service_name: {
      type: String,
      required: true
    },
    price_per_person: {
      type: Number,
      required: true
    },
    service_total: {
      type: Number,
      required: true
    }
  }],
  total_quote: {
    type: Number,
    required: true
  },
  event_type: {
    type: String,
    default: "General"
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  valid_until: {
    type: Date,
    default: function() {
      // Válida por 30 días desde la creación
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "Quotation",  // Nombre explícito de la colección
  timestamps: true
});

// Middleware para actualizar updated_at antes de guardar
quotationSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Índices para mejorar el rendimiento
quotationSchema.index({ client_id: 1 });
quotationSchema.index({ quote_id: 1 });
quotationSchema.index({ status: 1 });
quotationSchema.index({ created_at: -1 });

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;