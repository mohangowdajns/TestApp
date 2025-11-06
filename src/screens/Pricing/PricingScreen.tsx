import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '../../context/ThemeContext';

interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  price: string;
  badge: string;
  features: string[];
  highlighted: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: '1',
    name: 'Trial Period',
    duration: 'First 30 Days',
    price: 'Free',
    badge: '30 Days Free Trial',
    features: [
      'Everything included completely',
      'Unlimited Contacts',
      'Unlimited Projects & Design Studio',
      'Unlimited Solar Estimates',
      'Unlimited Site Surveys',
    ],
    highlighted: false,
  },
  {
    id: '2',
    name: 'Standard Plan',
    duration: 'Monthly',
    price: '$99',
    badge: 'Most Popular',
    features: [
      'All trial features',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access',
      'Monthly reporting',
    ],
    highlighted: true,
  },
  {
    id: '3',
    name: 'Premium Plan',
    duration: 'Monthly',
    price: '$299',
    badge: 'Enterprise',
    features: [
      'All standard features',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security',
      'Unlimited API calls',
      'Custom training',
    ],
    highlighted: false,
  },
];

export default function PricingScreen() {
  const { theme } = useThemeContext();
  const [selectedPlan, setSelectedPlan] = useState('2');

  const getTitleStyle = () => ({
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '700' as const,
  });

  const getCardStyle = (plan: PricingPlan) => ({
    backgroundColor: plan.highlighted ? theme.colors.primary : theme.colors.surface,
    borderWidth: selectedPlan === plan.id ? 2 : 0,
    borderColor: plan.highlighted ? theme.colors.primary : theme.colors.border,
    elevation: plan.highlighted ? 8 : 2,
  });

  const getBadgeStyle = (plan: PricingPlan) => ({
    backgroundColor: plan.highlighted ? 'rgba(255, 255, 255, 0.25)' : theme.colors.primary + '20',
  });

  const getBadgeTextStyle = (plan: PricingPlan) => ({
    color: plan.highlighted ? '#fff' : theme.colors.primary,
    fontSize: 11,
    fontWeight: '600' as const,
  });

  const getPlanNameStyle = (plan: PricingPlan) => ({
    color: plan.highlighted ? '#fff' : theme.colors.text,
    fontSize: 20,
    fontWeight: '600' as const,
  });

  const getPriceStyle = (plan: PricingPlan) => ({
    color: plan.highlighted ? '#fff' : theme.colors.primary,
    fontSize: 32,
    fontWeight: '700' as const,
  });

  const getDurationStyle = (plan: PricingPlan) => ({
    color: plan.highlighted ? 'rgba(255, 255, 255, 0.7)' : theme.colors.textSecondary,
    fontSize: 12,
    marginLeft: theme.spacing.sm,
  });

  const getDividerStyle = (plan: PricingPlan) => ({
    backgroundColor: plan.highlighted ? 'rgba(255, 255, 255, 0.2)' : theme.colors.border,
    marginVertical: theme.spacing.md,
  });

  const getFeatureTextStyle = (plan: PricingPlan) => ({
    color: plan.highlighted ? 'rgba(255, 255, 255, 0.9)' : theme.colors.text,
    fontSize: 13,
    flex: 1,
  });

  const getButtonStyle = (plan: PricingPlan) => ({
    marginTop: theme.spacing.lg,
    borderColor: plan.highlighted ? '#fff' : theme.colors.primary,
  });

  const getButtonLabelStyle = (plan: PricingPlan) => ({
    color: plan.highlighted ? '#fff' : theme.colors.primary,
    fontSize: 14,
    fontWeight: '600' as const,
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: theme.spacing.lg }]}>
        <Text style={[styles.title, getTitleStyle()]}>Start Building Your Solar Business</Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
          ]}
        >
          Full access to all features for 30 days. No commitment.
        </Text>
      </View>

      {/* Pricing Plans */}
      <View style={[styles.plansContainer, { paddingHorizontal: theme.spacing.lg }]}>
        {PRICING_PLANS.map(plan => (
          <TouchableOpacity
            key={plan.id}
            onPress={() => setSelectedPlan(plan.id)}
            activeOpacity={0.7}
            style={{ marginBottom: theme.spacing.lg }}
          >
            <Card style={[styles.planCard, getCardStyle(plan)]}>
              <View style={[styles.cardContent, { padding: theme.spacing.lg }]}>
                {/* Badge */}
                <View style={[styles.badge, getBadgeStyle(plan)]}>
                  <Text style={[styles.badgeText, getBadgeTextStyle(plan)]}>{plan.badge}</Text>
                </View>

                {/* Plan Name & Price */}
                <View style={[styles.planInfo, { marginTop: theme.spacing.md }]}>
                  <Text style={[styles.planName, getPlanNameStyle(plan)]}>{plan.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, getPriceStyle(plan)]}>{plan.price}</Text>
                    <Text style={[styles.duration, getDurationStyle(plan)]}>/{plan.duration}</Text>
                  </View>
                </View>

                {/* Divider */}
                <Divider style={[styles.divider, getDividerStyle(plan)]} />

                {/* Features */}
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, index) => (
                    <View
                      key={index}
                      style={[styles.featureItem, { marginBottom: theme.spacing.sm }]}
                    >
                      <Icon
                        name="check-circle"
                        size={20}
                        color={plan.highlighted ? '#fff' : theme.colors.success}
                        style={{ marginRight: theme.spacing.sm }}
                      />
                      <Text style={[styles.featureText, getFeatureTextStyle(plan)]}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {/* Button */}
                <Button
                  mode={plan.highlighted ? 'contained' : 'outlined'}
                  style={[styles.selectButton, getButtonStyle(plan)]}
                  labelStyle={getButtonLabelStyle(plan)}
                  buttonColor={plan.highlighted ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
                >
                  Select Plan
                </Button>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: theme.spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  plansContainer: {
    flex: 1,
  },
  planCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontWeight: '600',
  },
  planInfo: {
    flexDirection: 'column',
  },
  planName: {
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontWeight: '700',
  },
  duration: {
    fontWeight: '400',
  },
  divider: {
    height: 1,
  },
  featuresContainer: {
    marginVertical: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureText: {
    fontWeight: '400',
  },
  selectButton: {
    borderRadius: 8,
    paddingVertical: 6,
  },
});
