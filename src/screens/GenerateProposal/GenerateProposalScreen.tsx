import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '../../context/ThemeContext';

interface ProposalType {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
  priceLabel: string;
  deliverables: string[];
  estimatedTime: string;
  features: string[];
  viewSampleLink?: string;
}

const PROPOSAL_TYPES: ProposalType[] = [
  {
    id: '1',
    name: 'Essential Proposal',
    description: 'for a quick and easy project overview',
    icon: 'description',
    price: '₹149',
    priceLabel: 'one-time',
    deliverables: [
      '3D solar design model',
      'Cost comparison: with solar vs without',
      'Component-level details',
      'Custom company overview page',
    ],
    estimatedTime: '24-48 hours',
    features: [
      'Auto-generated from survey data',
      'Professional PDF format',
      'Client-ready presentation',
      'Email delivery included',
    ],
    viewSampleLink: 'View Sample Proposals',
  },
  {
    id: '2',
    name: 'Comprehensive Proposal',
    description: 'Detailed & Custom',
    icon: 'assessment',
    price: '₹499',
    priceLabel: 'one-time',
    deliverables: [
      'Detailed site analysis',
      'Multiple system designs',
      'Comparative cost analysis',
      'Advanced ROI modeling',
      'Weather impact analysis',
      'Financing options',
    ],
    estimatedTime: '3-5 business days',
    features: [
      'All standard features',
      'Custom design options',
      'Financing scenarios',
      'Advanced visualizations',
      'Dedicated account support',
      'Revision included',
    ],
  },
];

export default function GenerateProposalScreen() {
  const { theme } = useThemeContext();
  const [selectedProposal, setSelectedProposal] = useState('1');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const getTitleStyle = () => ({
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '700' as const,
  });

  const getSubtitleStyle = () => ({
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '400' as const,
    marginTop: theme.spacing.sm,
  });

  const getCardStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? '#E8F0FF' : '#FFFFFF',
    borderWidth: isSelected ? 2 : 1,
    borderColor: isSelected ? theme.colors.primary : '#E0E0E0',
    elevation: isSelected ? 4 : 1,
  });

  const getProposalNameStyle = () => ({
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600' as const,
  });

  const getProposalDescriptionStyle = () => ({
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '400' as const,
    marginTop: theme.spacing.xs,
  });

  const getDeliverablesHeaderStyle = () => ({
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600' as const,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  });

  const getDeliverablesItemStyle = () => ({
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '400' as const,
    flex: 1,
  });

  const getViewSampleLinkStyle = () => ({
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600' as const,
  });

  const getSectionHeaderStyle = () => ({
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600' as const,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  });

  const getInputStyle = () => ({
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  });

  const getProjectHeaderStyle = () => ({
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600' as const,
  });

  const getPriceStyle = () => ({
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600' as const,
    backgroundColor: '#B0C4E0',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: 16,
    overflow: 'hidden' as const,
  });

  const getSelectionIndicatorStyle = () => ({
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: theme.spacing.md,
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: theme.spacing.lg }]}>
        <Text style={[styles.title, getTitleStyle()]}>Generate Proposal</Text>
        <Text style={[styles.projectHeader, getProjectHeaderStyle()]}>
          For Project: Residential Solar - Koramangala
        </Text>
        <Text style={[styles.subtitle, getSubtitleStyle()]}>
          Create professional proposals for your clients in minutes
        </Text>
      </View>

      {/* Proposal Type Selection */}
      <View style={[styles.section, { paddingHorizontal: theme.spacing.lg }]}>
        <Text style={[styles.sectionHeader, getSectionHeaderStyle()]}>Select Proposal Type</Text>

        {PROPOSAL_TYPES.map(proposal => (
          <TouchableOpacity
            key={proposal.id}
            onPress={() => setSelectedProposal(proposal.id)}
            activeOpacity={0.7}
            style={{ marginBottom: theme.spacing.md }}
          >
            <Card style={[styles.proposalCard, getCardStyle(selectedProposal === proposal.id)]}>
              <View style={[styles.proposalContent, { padding: theme.spacing.lg }]}>
                {/* Selection Indicator and Header */}
                <View style={styles.headerRow}>
                  <View style={getSelectionIndicatorStyle()}>
                    {selectedProposal === proposal.id && (
                      <Icon name="check" size={16} color="#fff" />
                    )}
                  </View>
                  <View style={styles.headerTextContainer}>
                    <Text style={[styles.proposalName, getProposalNameStyle()]}>
                      {proposal.name}
                    </Text>
                    <Text style={[styles.proposalDescription, getProposalDescriptionStyle()]}>
                      {proposal.description}
                    </Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, getPriceStyle()]}>{proposal.price}</Text>
                  </View>
                </View>

                {selectedProposal === proposal.id && (
                  <View style={styles.deliverablesContainer}>
                    <Text style={[styles.deliverablesHeader, getDeliverablesHeaderStyle()]}>
                      Key Deliverables
                    </Text>
                    {proposal.deliverables.map((item, index) => (
                      <View
                        key={index}
                        style={[styles.deliverableItem, { marginBottom: theme.spacing.xs }]}
                      >
                        <Icon
                          name="check"
                          size={16}
                          color={theme.colors.success}
                          style={{ marginRight: theme.spacing.sm }}
                        />
                        <Text style={[styles.deliverablesItem, getDeliverablesItemStyle()]}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {proposal.viewSampleLink && selectedProposal === proposal.id && (
                  <TouchableOpacity style={{ marginTop: theme.spacing.md }}>
                    <Text style={[styles.viewSampleLink, getViewSampleLinkStyle()]}>
                      {'> ' + proposal.viewSampleLink}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Customer Information */}
      <View style={[styles.section, { paddingHorizontal: theme.spacing.lg }]}>
        <Text style={[styles.sectionHeader, getSectionHeaderStyle()]}>Client Information</Text>

        <TextInput
          label="Customer Name"
          value={customerName}
          onChangeText={setCustomerName}
          style={[styles.input, getInputStyle()]}
          mode="outlined"
          placeholder="Enter customer name"
        />

        <TextInput
          label="Customer Email"
          value={customerEmail}
          onChangeText={setCustomerEmail}
          style={[styles.input, getInputStyle()]}
          mode="outlined"
          placeholder="Enter customer email"
          keyboardType="email-address"
        />
      </View>

      {/* Action Buttons */}
      <View style={[styles.actionSection, { paddingHorizontal: theme.spacing.lg }]}>
        <Button
          mode="contained"
          style={[styles.generateButton, { marginBottom: theme.spacing.md }]}
          labelStyle={styles.buttonLabel}
          onPress={() => {
            // TODO: Generate proposal logic
            console.log('Generating proposal:', selectedProposal, customerName, customerEmail);
          }}
        >
          Generate & Send Proposal
        </Button>

        <Button
          mode="outlined"
          style={styles.previewButton}
          labelStyle={styles.previewButtonLabel}
          onPress={() => {
            // TODO: Preview proposal logic
            console.log('Previewing proposal:', selectedProposal);
          }}
        >
          Preview Proposal
        </Button>
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
    marginBottom: 24,
  },
  projectHeader: {
    marginTop: 8,
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  proposalCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  proposalContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  proposalInfo: {
    flex: 1,
  },
  proposalName: {
    marginBottom: 4,
  },
  proposalDescription: {
    lineHeight: 16,
  },
  priceContainer: {
    paddingVertical: 4,
  },
  price: {
    fontWeight: '600',
  },
  deliverablesContainer: {
    marginTop: 12,
  },
  deliverablesHeader: {
    marginBottom: 8,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliverablesItem: {
    lineHeight: 18,
  },
  featuresContainer: {
    marginTop: 12,
  },
  featuresHeader: {
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureItemText: {
    lineHeight: 18,
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
  },
  estimatedTimeText: {
    flex: 1,
  },
  viewSampleLink: {
    fontWeight: '600',
  },
  actionSection: {
    marginBottom: 24,
  },
  generateButton: {
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewButton: {
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewButtonLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  input: {
    marginBottom: 12,
  },
});
